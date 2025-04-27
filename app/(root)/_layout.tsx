import { Tabs } from "expo-router";


export default function Layout() {


  return (
    <Tabs
    screenOptions={{
    headerShown: false,
    tabBarStyle: {
      display:'none'
    }
   }}
   
    >
        <Tabs.Screen name="(auth)"  options={{ headerShown: false }}/>
        <Tabs.Screen name="(tabs)"  options={{ headerShown: false }}/>
    </Tabs>
  );
}