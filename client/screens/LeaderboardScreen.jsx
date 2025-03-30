import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator } from "react-native";
import { AuthContext } from "../context/authContext";

const LeaderboardScreen = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authState] = useContext(AuthContext);

  useEffect(() => {
    if (authState.token) {
      fetchLeaderboard();
    }
  }, [authState.token]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const token = authState.token;

      const response = await fetch("https://ptahapp-server.onrender.com/api/v1/mission/user/rankings", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // ✅ Log ข้อมูลแบบสวยงาม
      console.log("\n================ 📦 ผลลัพธ์จาก API /rankings =================");
      console.log("✅ ทั้งหมด:", data);
      
      if (data.success && Array.isArray(data.rankings)) {
        console.log("\n---------------- ✅ Rankings ที่ได้ ----------------");
        data.rankings.forEach((item, index) => {
          console.log(`อันดับ ${index + 1}`);
          console.log(`  👤 ${item.name} ${item.surname}`);
          console.log(`  ⭐ ดาว: ${item.totalStars}`);
          console.log(`  📊 ประเมิน: ${item.evaluationCount} ครั้ง`);
          console.log(`  ⏱️ เวลาแรก: ${item.firstEvaluationTime}`);
          console.log("--------------------------------------------------");
        });
      
        const cleanedData = data.rankings.map((item) => ({
          userId: item.userId?.trim() || "ไม่ระบุ",
          name: item.name?.trim() || "ไม่ระบุ",
          surname: item.surname?.trim() || " ",
          totalStars: item.totalStars || 0,
          evaluationCount: item.evaluationCount || 0,
          firstEvaluationTime: item.firstEvaluationTime
            ? new Date(item.firstEvaluationTime).toLocaleString("th-TH")
            : "ไม่มีข้อมูล",
        }));
      
        console.log("\n✅ 🧼 ข้อมูลหลัง Clean แล้ว:", cleanedData);
        console.log("====================================================\n");
      
        setLeaderboard(cleanedData);
        setLastUpdated(new Date());
      } else {
        console.error("❌ API Error:", data.message);
        setLeaderboard([]);
      }
      
      
    } catch (error) {
      console.error("Error fetching leaderboard:", error.message);
      setLeaderboard([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    const thaiYear = date.getFullYear() + 543;
    return date
      .toLocaleString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      .replace(/\d{4}/, thaiYear)
      .replace("ค.ศ.", "พ.ศ.");
  };

  const isCurrentUser = (userId) => {
    const currentId = authState.user?.id || authState.user?._id || "";
    return String(userId).trim() === String(currentId).trim();
  };
  
  const getDisplayName = (userId, name, surname) => {
    if (isCurrentUser(userId)) {
      return `${name} ${surname}`;
    }
    return `${name.slice(0, 3)}***  ${surname.slice(0, 3)}**`;
  };
  

  const renderPodium = () => {
    if (leaderboard.length < 3) return null;

    const [first = {}, second = {}, third = {}] = leaderboard?.slice(0, 3) || [];

    return (
      <View style={styles.podiumContainer}>
        {/* อันดับที่ 1 */}
        <Text style={[styles.rankName, styles.rank1, isCurrentUser(first.userId) && styles.currentUserName]}>
        {getDisplayName(first.userId, first.name, first.surname)}
        </Text>
        <Text style={[styles.rankStars, styles.star1]}>{first.totalStars} ⭐</Text>

        {/* อันดับที่ 2 */}
        <Text style={[styles.rankName, styles.rank2, isCurrentUser(second.userId) && styles.currentUserName]}>
        {getDisplayName(second.userId, second.name, second.surname)}
        </Text>
        <Text style={[styles.rankStars, styles.star2]}>{second.totalStars} ⭐</Text>

        {/* อันดับที่ 3 */}
        <Text style={[styles.rankName, styles.rank3, isCurrentUser(third.userId) && styles.currentUserName]}>
        {getDisplayName(third.userId, third.name, third.surname)}
        </Text>
        <Text style={[styles.rankStars, styles.star3]}>{third.totalStars} ⭐</Text>

        <Image source={require("../img/podium.png")} style={styles.podiumImage} />
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>กำลังโหลดข้อมูล...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>อันดับดาวประจำวัน</Text>
      {lastUpdated && (
        <Text style={styles.lastUpdated}>ข้อมูลล่าสุด: {formatDate(lastUpdated)}</Text>
      )}

      {renderPodium()}

      <FlatList
        data={leaderboard.slice(3)}
        keyExtractor={(item) => item.userId}
        renderItem={({ item, index }) => (
          <View style={styles.row}>
            
            <Text style={[styles.rank, isCurrentUser(item.userId) && styles.currentUserHighlight]}>
              {index + 4}
            </Text>
            <Text style={[styles.name, isCurrentUser(item.userId) && styles.currentUserHighlight]}>
              {getDisplayName(item.userId, item.name, item.surname)}
            </Text>
            <Text style={[styles.stars, isCurrentUser(item.userId) && styles.currentUserHighlight]}>
              {item.totalStars} ⭐
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "white",
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 5,
    fontFamily: "Kanit",
  },
  lastUpdated: {
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
    fontFamily: "Kanit",
  },
  podiumContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 180,
    marginTop: 90,
    marginBottom: 70,
  },
  podiumImage: {
    width: 220,
    height: 220,
  },
  rankName: {
    position: "absolute",
    fontSize: 15,
    color: "#333",
    fontFamily: "Kanit",
  },
  rankStars: {
    position: "absolute",
    fontSize: 20,
    color: "#333",
    fontFamily: "Kanit",
  },
  rank1: {
    top: -45,
    left: "44%",
    transform: [{ translateX: -20 }],
  },
  rank2: {
    top: 85,
    left: "8%",
  },
  rank3: {
    top: 100,
    right: "12%",
  },
  star1: {
    top: -75,
    left: "50%",
    transform: [{ translateX: -20 }],
  },
  star2: {
    top: 50,
    left: "15%",
  },
  star3: {
    top: 70,
    right: "16%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    margin: 5,
  },
  rank: {
    fontSize: 15,
    width: 30,
    fontWeight: "bold",
    color: "#555",
  },
  name: {
    fontSize: 15,
    flex: 1,
    color: "#444",
    fontFamily: "Kanit",
  },
  stars: {
    fontSize: 15,
    color: "#333",
    fontFamily: "Kanit",
  },
  evaluationCount: {
    position: "absolute",
    fontSize: 14,
    color: "#666",
    fontFamily: "Kanit",
  },
  evaluationCountt: {
    fontSize: 13,
    color: "#666",
    fontFamily: "Kanit",
    marginLeft:5,
    top:4
  },
  currentUserName: {
    color: "#87CEFA",
    fontFamily: "Kanit",

  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
    fontFamily: "Kanit",
  },
  count1: {
    top: -70,
    left: "55%",
    transform: [{ translateX: -20 }],
  },
  count2: {
    top: 55,
    left: "20%",
  },
  count3: {
    top: 75,
    right: "4%",
  },
  currentUserName: {
    color: "#87CEFA",
    fontFamily: "Kanit",
  },
  currentUserHighlight: {
    color: "#87CEFA",
    fontFamily: "Kanit",

  },
});

export default LeaderboardScreen;
