import { View, Text, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useEffect } from 'react';

interface TabButtonProps {
  route: any;
  label: string;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
  icon: string;
}

export default function TabButtons({ 
  route, 
  label, 
  isFocused, 
  onPress, 
  onLongPress,
  icon 
}: TabButtonProps) {
    
    const scale = useSharedValue(isFocused ? 1 : 0);

    useEffect(() => {
      scale.value = withSpring(isFocused ? 1 :0,{damping:10, stiffness:100})
    },[isFocused])

    const animatedTextStyle = useAnimatedStyle(()=>{
        return{
            opacity: interpolate(scale.value, [0,1], [1,0])
        }
    })

    const animatedIconStyle = useAnimatedStyle(()=>{
      return{
          top:interpolate(scale.value, [0,1], [0,8]),
          transform: [
              {
                  scale: interpolate(scale.value, [0,0.8], [1,1])
              }
          ]
      }
  })


  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={{
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className=' w-14 h-14 rounded-full'
    >
     <Animated.View style={[animatedIconStyle]} className={`${isFocused ? "bg-[#9065BC] p-2 rounded-full" :'bg-[#B395D1] p-2 rounded-full'}`}>
     <AntDesign 
      //@ts-ignore
        name={icon} 
        size={24} 
        color={isFocused ? "white" : "#9065BC"}
      />

     </Animated.View>
     <Animated.Text style={[animatedTextStyle, { color: isFocused ? "#5A199B" : '#B395D1' }, { fontSize: 12 }]}>
      {label}
    </Animated.Text>
    </Pressable>
  );
}