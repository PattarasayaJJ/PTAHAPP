import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/Home";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import HeaderMenu from "./HeaderMenu";
import Signup from "../../screens/auth/Signup";
import Signin from "../../screens/auth/Signin";
import Post from "../../screens/Post";
import Notification from "../../screens/Notification";
import Account from "../../screens/Account";
import Myposts from "../../screens/Myposts";
import HeaderLogo from "../../screens/HeaderLogo.jsx";
import { TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Badge } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Allblog from "../../screens/Allblog.jsx";
import EditPostScreen from "../../screens/EditPost.jsx";
import PostDetails from "../../screens/PostDetails.jsx";
import Therapy from "../../screens/Therapy";
import StepScreen from "../../screens/Step";
import StepDetailScreen from "../../screens/Step/Detail.jsx";
import TherapyFeedback from "../../screens/TherapyFeedback.jsx";
import Resultstherapy from "../../screens/Resultstherapy.jsx";
import LeaderboardScreen from "../../screens/LeaderboardScreen.jsx";
import TherapyFeedbackDetail from "../../screens/TherapyFeedbackDetail.jsx";
import History from "../../screens/History.jsx";
import ForgotPasswordCheckId from "../../screens/auth/ForgotPasswordCheckId.jsx";
import NewPassword from "../../screens/auth/NewPassword.jsx";
import OtpVerification from "../../screens/auth/OtpVerification.jsx";

const ScreenMenu = () => {
  const navigation = useNavigation();

  const [state] = useContext(AuthContext); // Hook ใช้ตามกฎที่กำหนด

  //auth condition true false

  const authenticatedUsed = state?.user && state?.token;

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Signin">
      {authenticatedUsed ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerTitle: (props) => <HeaderLogo {...props} />,
              headerTitleAlign: "center", // Align the title to the center
              headerShadowVisible: false, // เอาเส้นใต้ Header ออก
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate("Notification")}
                  style={{
                    position: "relative",
                    width: 40,
                    height: 40,
                    marginTop: 6,
                  }}
                >
                  <FontAwesome5
                    name="bell"
                    size={25}
                    color="#87CEFA"
                    style={{ marginLeft: 10 }}
                  />
                  {state.notificationsCount !== "" && (
                    <Badge
                      value={state.notificationsCount}
                      status="error"
                      containerStyle={{
                        position: "absolute",
                        top: -4,
                        right: -4,
                      }}
                    />
                  )}
                </TouchableOpacity>
              ),
            }}
          />

          <Stack.Screen
            name="Allblog"
            component={Allblog}
            options={{
              headerBackTitle: "Back",
              headerTintColor: "#87CEFA", 
              headerTitle: (props) => <HeaderLogo {...props} />,
              headerTitleAlign: "center",
              headerShadowVisible: false, // เอาเส้นใต้ Header ออก
            }}
          />

          <Stack.Screen
            name="Notification"
            component={Notification}
            options={{
              headerBackTitle: "Back",
              headerTintColor: "#87CEFA", 
              headerTitle: (props) => <HeaderLogo {...props} />,
              headerTitleAlign: "center",
              headerShadowVisible: false, // เอาเส้นใต้ Header ออก
            }}
          />

          <Stack.Screen
            name="Post"
            component={Post}
            options={{
              headerBackTitle: "Back",
              headerTintColor: "#87CEFA", 
              headerTitle: (props) => <HeaderLogo {...props} />,
              headerTitleAlign: "center",
              headerShadowVisible: false, // เอาเส้นใต้ Header ออก
            }}
          />

          <Stack.Screen
            name="Myposts"
            component={Myposts}
            options={{
              headerBackTitle: "Back",
              headerTintColor: "#87CEFA", 
              headerTitle: (props) => <HeaderLogo {...props} />,
              headerTitleAlign: "center",
              headerShadowVisible: false, // เอาเส้นใต้ Header ออก
            }}
          />
          <Stack.Screen
            name="Editpost"
            component={EditPostScreen}
            options={{
              headerBackTitle: "Back",
              headerTintColor: "#87CEFA", 
              headerTitle: (props) => <HeaderLogo {...props} />,
              headerTitleAlign: "center",
              headerShadowVisible: false, // เอาเส้นใต้ Header ออก
            }}
          />

          <Stack.Screen
            name="Account"
            component={Account}
            options={{
              headerBackTitle: "Back",
              headerTintColor: "#87CEFA", 
              headerTitle: (props) => <HeaderLogo {...props} />,
              headerTitleAlign: "center",
              headerShadowVisible: false, // เอาเส้นใต้ Header ออก
            }}
          />

          <Stack.Screen
            name="PostDetails"
            component={PostDetails}
            options={{
              headerBackTitle: "Back",
              headerTintColor: "#87CEFA", 
              headerTitle: (props) => <HeaderLogo {...props} />,
              headerTitleAlign: "center",
              headerShadowVisible: false, // เอาเส้นใต้ Header ออก
            }}
          />
          <Stack.Screen
            name="Therapy"
            component={Therapy}
            options={{
              headerBackTitle: "Back",
              headerTintColor: "#87CEFA", 
              headerTitle: (props) => <HeaderLogo {...props} />,
              headerTitleAlign: "center",
              headerShadowVisible: false, // เอาเส้นใต้ Header ออก
            }}
          />
          <Stack.Screen
            name="Step"
            component={StepScreen}
            options={{
              headerBackTitle: "Back",
              headerTintColor: "#87CEFA",
              headerTitle: (props) => <HeaderLogo {...props} />,
              headerTitleAlign: "center",
              headerShadowVisible: false, // เอาเส้นใต้ Header ออก
            }}
          />
          <Stack.Screen
            name="StepDetail"
            component={StepDetailScreen}
            options={{
              headerShown: false,
              //   headerBackTitle: "Back",
              //   headerTitle: (props) => <HeaderLogo {...props} />,
              //   headerTitleAlign: "center",
            }}
          />

          <Stack.Screen
            name="TherapyFeedback"
            component={TherapyFeedback}
            options={{
              headerBackTitle: "Back",
              headerTintColor: "#87CEFA", 
              headerTitle: (props) => <HeaderLogo {...props} />,
              headerTitleAlign: "center",
              headerShadowVisible: false, // เอาเส้นใต้ Header ออก
            }}
          />
          <Stack.Screen
            name="TherapyFeedbackDetail"
            component={TherapyFeedbackDetail}
            options={{
              headerBackTitle: "Back",
              headerTintColor: "#87CEFA", 
              headerTitle: (props) => <HeaderLogo {...props} />,
              headerTitleAlign: "center",
              headerShadowVisible: false, // เอาเส้นใต้ Header ออก
            }}
          />

          <Stack.Screen
            name="Resultstherapy"
            component={Resultstherapy}
            options={{
              headerBackTitle: "Back",
              headerTintColor: "#87CEFA", 
              headerTitle: (props) => <HeaderLogo {...props} />,
              headerTitleAlign: "center",
              headerShadowVisible: false, // เอาเส้นใต้ Header ออก
            }}
          />

          <Stack.Screen
            name="LeaderboardScreen"
            component={LeaderboardScreen}
            options={{
              headerBackTitle: "Back",
              headerTintColor: "#87CEFA", 
              headerTitle: (props) => <HeaderLogo {...props} />,
              headerTitleAlign: "center",
              headerShadowVisible: false, // เอาเส้นใต้ Header ออก
            }}
          />

          <Stack.Screen
            name="History"
            component={History}
            options={{
              headerBackTitle: "Back",
              headerTintColor: "#87CEFA", 
              headerTitle: (props) => <HeaderLogo {...props} />,
              headerTitleAlign: "center",
              headerShadowVisible: false, // เอาเส้นใต้ Header ออก
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Signin"
            component={Signin}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ForgotPasswordCheckId"
            component={ForgotPasswordCheckId}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="OtpVerification"
            component={OtpVerification}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="NewPassword"
            component={NewPassword}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ScreenMenu;
