
import Home from './home';
import Profile from './profile';
import MyTabBar from '@/components/TabBar';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Playlist from './playlist';





const Tab = createBottomTabNavigator();
export default function TabLayout() {

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tab.Screen name="Home"  options={{headerShown:false}} component={Home} />
      <Tab.Screen name="Playlist"  options={{headerShown:false}} component={Playlist}/>
      <Tab.Screen name="Profile"   options={{headerShown:false}} component={Profile}/>
    </Tab.Navigator>
  );
}