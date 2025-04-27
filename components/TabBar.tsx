
import { View } from 'react-native';
import TabButtons from './TabButtons';
import { Colors } from '@/constants/Colors';
import { WIDTH } from '@/constants/screen';
import { useState } from 'react';
import  { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export const ICONS:{[key:string]:string}= {
    Home:'home',
    Playlist:'play',
    Profile:'user'
}

export default function MyTabBar({ state, descriptors, navigation }:{state:any, descriptors:any, navigation:any}) {

    const buttonWidth = WIDTH/state.routes.length
    const [dimensions, setDimensions]= useState({
        width:0,
        height:0
    })

    const onTabBarLayout = (event:any) => {
       setDimensions({
        width: event.nativeEvent.layout.width,
        height: event.nativeEvent.layout.height
       })
    }


    const tabPositionX = useSharedValue(0)

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: tabPositionX.value }],
        }
    })
  return (
    <View className='bg-purple-300 ' style={{ 
      flexDirection: 'row',
    //   backgroundColor: 'white',
    justifyContent: 'space-around',
      alignItems: 'center',
     paddingVertical: 10,

    }}>
         {/* <Animated.View style={[animatedStyle, {position:'absolute', backgroundColor:'#723FEB',  borderRadius:30, marginHorizontal: 12, height:dimensions.height-15, width:buttonWidth-25, bottom:7.5}]}/> */}
      {state.routes.map((route:any, index:number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
            
            tabPositionX.value = withSpring(index * buttonWidth, {damping: 15, stiffness: 180, mass: 0.5 });
            

          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabButtons 
            key={index} 
            route={route} 
            label={label} 
            isFocused={isFocused} 
            onPress={onPress} 
            onLongPress={onLongPress}
            icon={ICONS[route.name]}
          />
        );
      })}
    </View>
  );
}
