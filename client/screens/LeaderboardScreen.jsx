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
      setLoading(true); // ✅ เปิด loading ตอนเริ่มโหลดข้อมูล
      const token = authState.token;
    
      const response = await fetch("http://10.0.2.2:8080/api/v1/mission/user/rankings", {
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
      console.log("📌 API Response:", JSON.stringify(data, null, 2)); // ✅ ตรวจสอบ JSON
    
      if (data.success && Array.isArray(data.rankings)) {
        const cleanedData = data.rankings.map((item) => ({
          userId: item.userId?.trim() || "ไม่ระบุ",
          name: item.name?.trim() || "ไม่ระบุ",
          surname: item.surname?.trim() || " ",
          totalStars: item.totalStars || 0,
          evaluationCount: item.evaluationCount || 0,
          firstEvaluationTime: item.firstEvaluationTime ? new Date(item.firstEvaluationTime).toLocaleString("th-TH") : "ไม่มีข้อมูล",
        }));
  
        setLeaderboard(cleanedData);
        setLastUpdated(new Date());
      } else {
        console.error("API Error:", data.message);
        setLeaderboard([]); // ✅ ป้องกันค่า `undefined`
      }
    } catch (error) {
      console.error("Error fetching leaderboard:", error.message);
      setLeaderboard([]); // ✅ ป้องกันกรณีเกิด error
    } finally {
      setLoading(false); // ✅ ปิด loading เสมอ
    }
  };
  
  

  const formatDate = (date) => {
    if (!date) return "";
    const thaiYear = date.getFullYear() + 543;
    return date.toLocaleString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).replace(/\d{4}/, thaiYear)
      .replace("ค.ศ.", "พ.ศ.");
  };

  const renderPodium = () => {
    if (leaderboard.length < 3) return null;
  
    const [first = {}, second = {}, third = {}] = leaderboard?.slice(0, 3) || [];
  
    return (
      <View style={styles.podiumContainer}>
        {/* อันดับที่ 1 */}
        <Text style={[styles.rankName, styles.rank1]}>
          {first.name.slice(0, 3)}***  {first.surname.slice(0, 3)}**
        </Text>
        <Text style={[styles.rankStars, styles.star1]}>{first.totalStars} ⭐</Text>
        <Text style={[styles.evaluationCount, styles.count1]}>({first.evaluationCount} ครั้ง)</Text>
  
        {/* อันดับที่ 2 */}
        <Text style={[styles.rankName, styles.rank2]}>
          {second.name.slice(0, 3)}***  {second.surname.slice(0, 3)}**
        </Text>
        <Text style={[styles.rankStars, styles.star2]}>{second.totalStars} ⭐</Text>
        <Text style={[styles.evaluationCount, styles.count2]}>({second.evaluationCount} ครั้ง)</Text>
  
        {/* อันดับที่ 3 */}
        <Text style={[styles.rankName, styles.rank3]}>
          {third.name.slice(0, 3)}***  {third.surname.slice(0, 3)}**
        </Text>
        <Text style={[styles.rankStars, styles.star3]}>{third.totalStars} ⭐</Text>
        <Text style={[styles.evaluationCount, styles.count3]}>({third.evaluationCount} ครั้ง)</Text>
  
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
        renderItem={({ item, index }) => {
          const isCurrentUser = item.userId === authState.user?.id;

          return (
            <View style={styles.row}>
              <Text style={styles.rank}>{index + 4}</Text>
              <Text style={[styles.name, isCurrentUser && styles.currentUserName]}>
                {item.name.slice(0, 3)}***  {item.surname.slice(0, 3)}**
              </Text>
              <Text style={styles.stars}>{item.totalStars} ⭐</Text>
              <Text style={styles.evaluationCountt}>({item.evaluationCount} ครั้ง)</Text>
            </View>
          );
        }}
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
    fontSize: 16,
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
    right: "8%",
  },
  star1: {
    top: -75,
    left: "40%",
    transform: [{ translateX: -20 }],
  },
  star2: {
    top: 50,
    left: "8%",
  },
  star3: {
    top: 70,
    right: "20%",
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
    fontSize: 17,
    width: 30,
    fontWeight: "bold",
    color: "#555",
  },
  name: {
    fontSize: 17,
    flex: 1,
    color: "#444",
    fontFamily: "Kanit",
  },
  stars: {
    fontSize: 17,
    color: "#333",
    fontFamily: "Kanit",
  },
  evaluationCount: {
    fontSize: 15,
    color: "#777",
    fontFamily: "Kanit",
  },
  currentUserName: {
    color: "#FFD700",
    fontWeight: "bold",
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
  evaluationCount: {
    position: "absolute",
    fontSize: 16,
    color: "#666",
    fontFamily: "Kanit",
  },
  evaluationCountt:{
    fontSize: 16,
    color: "#666",
    fontFamily: "Kanit",
  },
  
  count1: {
    top: -70, // วางไว้ใกล้กับชื่อของอันดับ 1
    left: "55%",
    transform: [{ translateX: -20 }],
  },
  
  count2: {
    top: 55, // วางไว้ใกล้กับชื่อของอันดับ 2
    left: "20%",
  },
  
  count3: {
    top: 75, // วางไว้ใกล้กับชื่อของอันดับ 3
    right: "4%",
  },
});

export default LeaderboardScreen;
