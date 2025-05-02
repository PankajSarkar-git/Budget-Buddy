import {View, Text} from 'react-native';
import React, {useState} from 'react';
import tw from 'twrnc';
import {textStyle} from '../../constant/textStyle';
import {colors} from '../../constant/colors';
import {useAppSelector} from '../../hooks/reduxHooks';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';

// interface EarningItemProps {
//   type: 'Earning' | 'Expenses';
//   source: string;
//   description: string;
//   amount: number;
//   date: string;
//   onEdit?: () => void;
//   onDelete?: () => void;
// }
interface EarningItemProps {
  type: 'Earning' | 'Expenses';
  source?: string;
  description: string;
  amount: number;
  date: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const EarningItem = ({
  amount,
  description,
  source,
  type,
  date,
  onDelete,
  onEdit,
}: EarningItemProps) => {
  const {isDarkMode} = useAppSelector(store => store.ui);
  const newDate = new Date(date).toLocaleString().split(',')[0];

  
  const animation = useSharedValue(0);

  const SWIPE_THRESHOLD = 80;

  const handleEdit = () => {
    if (onEdit) {
      onEdit();
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };
  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      animation.value = event.translationX;
    })
    .onEnd(() => {
      if (animation.value > SWIPE_THRESHOLD) {
        runOnJS(handleEdit)();
      } else if (animation.value < -SWIPE_THRESHOLD) {
        runOnJS(handleDelete)();
      }
      animation.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: animation.value}],
  }));

  const animatedLeftIconStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale:
          animation.value > SWIPE_THRESHOLD ? withSpring(1.5) : withSpring(1),
      },
    ],
  }));

  const animatedRightIconStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale:
          animation.value < -SWIPE_THRESHOLD ? withSpring(1.5) : withSpring(1),
      },
    ],
  }));

  const animatedMainBodyStyle = useAnimatedStyle(() => {
    if (animation.value > 0) {
      return {backgroundColor: '#5acf13'};
    } else if (animation.value < 0) {
      return {backgroundColor: '#FF0000'};
    }
    return {backgroundColor: '#FFFFFF'};
  });


  return (
    <View>
      <GestureHandlerRootView style={tw`justify-center items-center`}>
        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[tw`w-full flex-row items-center`, {elevation: 5}]}>
            <Animated.View
              style={[
                tw`w-full h-32 flex-row justify-between items-center shadow-2xl z-10 relative`,
                animatedMainBodyStyle,
              ]}>
              <Animated.View style={[tw`ml-7`, animatedLeftIconStyle]}>
                <Icon name="edit" size={20} color={'white'} />
              </Animated.View>
              <Animated.View style={[tw`mr-7`, animatedRightIconStyle]}>
                <Icon name="trash" size={20} color={'white'} />
              </Animated.View>
              <Animated.View
                style={[
                  tw`h-full w-full ${isDarkMode ? "bg-black": "bg-white"} absolute z-10`,
                  animatedStyle,
                ]}>
                <View style={tw`w-full px-5 mt-4`}>
                  <View style={tw`flex-row`}>
                    <View style={tw`overflow-hidden`}>
                      <View
                        style={tw`w-3.5 h-3.5 bg-[${colors.textPrimary}] rounded-full -ml-1.5`}
                      />
                    </View>
                    <View style={tw`w-full flex-row justify-between ml-1.5`}>
                      <View style={tw`gap-1`}>
                        <Text
                          style={[
                            tw`${isDarkMode ? 'text-white' : 'text-[#2F2F2F]'}`,
                            textStyle.fsrobo_14_500,
                          ]}>
                          {type}
                        </Text>
                        <Text
                          style={[
                            tw`${isDarkMode ? 'text-gray-300' : 'text-black'}`,
                            textStyle.fsrobo_16_500,
                          ]}>
                          {source}
                        </Text>
                        <Text
                          style={[tw`text-[#686868]`, textStyle.fsrobo_14_400]}>
                          {description}
                        </Text>
                      </View>
                      <View style={tw`mr-2.5`}>
                        <Text
                          style={[
                            tw`text-[#686868] mb-5`,
                            textStyle.fsrobo_14_400,
                          ]}>
                          {newDate}
                        </Text>
                        <Text
                          style={[
                            tw`${
                              type === 'Earning'
                                ? 'text-green-600'
                                : 'text-red-500'
                            } mr-6`,
                            textStyle.fsrobo_24_500,
                          ]}>
                          ₹ {new Intl.NumberFormat('en-IN').format(amount)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );
};

export default EarningItem;
