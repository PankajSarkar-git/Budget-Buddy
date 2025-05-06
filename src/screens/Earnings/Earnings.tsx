import {
  View,
  Text,
  Pressable,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks';
import tw from 'twrnc';
import BodyCard from '../../components/BodyCard/BodyCard';
import {colors} from '../../constant/colors';
import EarningsCategoryItem from '../../components/EarningsCategoryItem/EarningsCategoryItem';
import {useNavigation} from '@react-navigation/native';
import {textStyle} from '../../constant/textStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import {DropdownItem, EarningItemSource} from '../../utils/types';
import {earningStats} from '../../store/earning';

const Earnings = () => {
  const [filterVal, setFilterVal] = useState<string>('This Month');
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<EarningItemSource[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const {isDarkMode} = useAppSelector(store => store.ui);
  const {currentEarning} = useAppSelector(store => store.auth);
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();

  const items: DropdownItem[] = [
    {label: 'Today', value: 'Today'},
    {label: 'This Week', value: 'This Week'},
    {label: 'This Month', value: 'This Month'},
    {label: 'Previous Month', value: 'Previous Month'},
    {label: 'All', value: 'All'},
  ];

  const selectItem = (item: DropdownItem) => {
    setFilterVal(item.label);
    setPage(1);
    setData([]);
    setHasMore(true);
    setOpen(false);
  };

  const fetchData = async (pageNum = 1) => {
    if (!hasMore && pageNum !== 1) return;

    try {
      const {payload}: any = await dispatch(
        earningStats({
          filter: filterVal,
          limit: 10,
          page: pageNum,
        }),
      );
      console.log(payload, 'payload...');

      if (payload?.data?.success) {
        const newData = payload?.data?.earnings || [];

        if (pageNum === 1) {
          setData(newData);
        } else if (pageNum < 1 && newData.length) {
          setData(prev => [...prev, ...newData]);
        }

        // If less than 10 items returned, no more data to fetch
        if (newData.length < 10) setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchData(1);
  }, [filterVal, currentEarning]);

  const loadMoreData = () => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true);
      const nextPage = page + 1;
      setPage(nextPage);
      fetchData(nextPage);
    }
  };

  const allAmount =
    data?.find(item => item.source === 'All')?.totalEarning || 0;


  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (open) {
          setOpen(false);
          Keyboard.dismiss();
        }
      }}>
      <View style={tw`flex-1 ${isDarkMode ? `bg-black` : `bg-white`} px-5`}>
        {/* Top Filter Button */}
        <View style={tw`w-full flex-row justify-end mt-5`}>
          <View style={tw` w-36 flex-row justify-end relative`}>
            <TouchableOpacity
              onPress={() => setOpen(!open)}
              style={tw`bg-[${colors.primary}] flex flex-row items-center justify-center gap-1.5 rounded-2xl px-4 py-2.5`}>
              <Icon name="filter" color={'white'} size={16} />
              <Text style={[tw`mb-1 text-white`, textStyle.fsrobo_16_400]}>
                {filterVal || 'Filter'}
              </Text>
            </TouchableOpacity>

            {/* Dropdown */}
            {open && (
              <View
                style={tw`absolute top-16 left-0 px-4 bg-white rounded-lg shadow-lg border border-gray-200 z-10`}>
                <FlatList
                  data={items}
                  keyExtractor={(item, index) => index.toString()}
                  style={tw`max-h-40`}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() => selectItem(item)}
                      style={tw`px-4 py-2 border-b border-gray-100`}>
                      <Text style={tw`text-black`}>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          </View>
        </View>

        {/* Earnings Body */}
        <View style={tw`mt-8`}>
          <BodyCard title="Earnings" amount={Number(allAmount)} />
        </View>

        <View style={tw`flex justify-center items-center`}>
          <View style={tw`w-52 h-[1px] bg-[${colors.lightBorder}] mt-8 mb-7`} />
        </View>

        <FlatList
          data={data}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={tw`gap-3 pb-12`}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadingMore ? (
              <Text style={tw`text-center text-gray-500 mt-4`}>Loading...</Text>
            ) : null
          }
          renderItem={({item}) => (
            <Pressable
              onPress={() =>
                navigation.navigate('Earning Details', {
                  source: item.source,
                  filter: filterVal,
                })
              }>
              <EarningsCategoryItem
                source={item?.source}
                totalEarning={item?.totalEarning}
              />
            </Pressable>
          )}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Earnings;
