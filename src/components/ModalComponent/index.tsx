import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import tw from 'twrnc';
import { RootState } from '../../store';
import { colors } from '../../constant/colors';

type ModalProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
};

const ModalComponent = ({ visible, onClose, title, children }: ModalProps) => {
  const isDarkMode = useSelector((state: RootState) => state.ui.isDarkMode);

  const backgroundColor = isDarkMode ? colors.dark : colors.white;
  const textColor = isDarkMode ? colors.white : colors.black;
  const iconColor = isDarkMode ? colors.white : colors.black;

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      backdropOpacity={0.3}>
      <View style={[tw`p-5 rounded-xl relative`, { backgroundColor }]}>
        {/* Close icon */}
        <Pressable onPress={onClose} style={tw`absolute top-3 right-3 z-10`}>
          <Icon name="x" size={24} color={iconColor} />
        </Pressable>

        {title && (
          <Text style={[tw`text-lg font-bold mb-4 -mt-3`, { color: textColor }]}>
            {title}
          </Text>
        )}

        <View>{children}</View>
      </View>
    </Modal>
  );
};

export default ModalComponent;

