// import {
//   View,
//   Text,
//   Pressable,
//   FlatList,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   Keyboard,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks';
// import tw from 'twrnc';
// import BodyCard from '../../components/BodyCard/BodyCard';
// import {colors} from '../../constant/colors';
// import EarningsCategoryItem from '../../components/EarningsCategoryItem/EarningsCategoryItem';
// import {useNavigation} from '@react-navigation/native';
// import {textStyle} from '../../constant/textStyle';
// import Icon from 'react-native-vector-icons/Ionicons';
// import {DropdownItem, EarningItemCategory} from '../../utils/types';
// import {expenseStats} from '../../store/expense';

// const Expenses = () => {
//   const [filterVal, setFilterVal] = useState<string>('All');
//   const [open, setOpen] = useState<boolean>(false);
//   const [data, setData] = useState<EarningItemCategory[] | null>(null);
//   const {isDarkMode} = useAppSelector(store => store.ui);
//   const navigation = useNavigation<any>();
//   const dispatch = useAppDispatch();

//   const items: DropdownItem[] = [
//     {label: 'This Week', value: 'This Week'},
//     {label: 'This Month', value: 'This Month'},
//     {label: 'Previous Month', value: 'Previous Month'},
//     {label: 'All Over', value: 'All Over'},
//   ];

//   const selectItem = (item: DropdownItem) => {
//     setFilterVal(item.label);
//     setOpen(false);
//   };

//   const fetchData = async () => {
//     try {
//       const {payload}: any = await dispatch(
//         expenseStats({
//           filter: filterVal,
//           limit: 10,
//           page: 1,
//         }),
//       );
//       if (payload?.data?.success) {
//         setData(payload?.data?.expenses);
//       }
//       //console.log(payload, 'payload');
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const allAmount =
//     data?.find(item => item.category === 'All')?.totalExpense || 0;

//   return (
//     <TouchableWithoutFeedback
//       onPress={() => {
//         if (open) {
//           setOpen(false);
//           Keyboard.dismiss(); // Close keyboard also if open
//         }
//       }}>
//       <View style={tw`flex-1 ${isDarkMode ? `bg-black` : `bg-white`} px-5`}>
//         {/* Top Filter Button */}
//         <View style={tw`w-full flex-row justify-end mt-5`}>
//           <View style={tw`w-36 flex-row justify-end relative`}>
//             <TouchableOpacity
//               onPress={() => setOpen(!open)}
//               style={tw`bg-[${colors.primary}] flex flex-row items-center justify-center gap-1.5 rounded-2xl px-4 py-2.5`}>
//               <Icon name="filter" color={'white'} size={16} />
//               <Text style={[tw`mb-1 text-white`, textStyle.fsrobo_16_400]}>
//                 {filterVal ? filterVal : 'Filter'}
//               </Text>
//             </TouchableOpacity>

//             {/* Dropdown */}
//             {open && (
//               <View
//                 style={tw`absolute top-16 left-0 px-4 bg-white rounded-lg shadow-lg border border-gray-200 z-10`}>
//                 <FlatList
//                   data={items}
//                   keyExtractor={(item, index) => index.toString()}
//                   style={tw`max-h-40`}
//                   renderItem={({item}) => (
//                     <TouchableOpacity
//                       onPress={() => selectItem(item)}
//                       style={tw`px-4 py-2 border-b border-gray-100`}>
//                       <Text style={tw`text-black`}>{item.label}</Text>
//                     </TouchableOpacity>
//                   )}
//                 />
//               </View>
//             )}
//           </View>
//         </View>

//         {/* Earnings Body */}
//         <View style={tw`mt-8`}>
//           <BodyCard title="Expenses" amount={Number(allAmount)} />
//         </View>

//         <View style={tw`flex justify-center items-center`}>
//           <View style={tw`w-52 h-[1px] bg-[${colors.lightBorder}] mt-8 mb-7`} />
//         </View>

//         <FlatList
//           data={data}
//           keyExtractor={(_, index) => index.toString()}
//           contentContainerStyle={tw`gap-3`}
//           renderItem={({item}) => (
//             <Pressable
//               onPress={() =>
//                 navigation.navigate('Expenses Details', {
//                   category: item.category,
//                   filter: filterVal,
//                 })
//               }>
//               <EarningsCategoryItem
//                 source={item?.category}
//                 totalEarning={item?.totalExpense}
//               />
//             </Pressable>
//           )}
//         />
//       </View>
//     </TouchableWithoutFeedback>
//   );
// };

// export default Expenses;

import {
  View,
  Text,
  Pressable,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks';
import tw from 'twrnc';
import BodyCard from '../../components/BodyCard/BodyCard';
import {colors} from '../../constant/colors';
import EarningsCategoryItem from '../../components/EarningsCategoryItem/EarningsCategoryItem';
import {useNavigation} from '@react-navigation/native';
import {textStyle} from '../../constant/textStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import {DropdownItem, EarningItemCategory} from '../../utils/types';
import {expenseStats} from '../../store/expense';

const Expenses = () => {
  const [filterVal, setFilterVal] = useState<string>('All');
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<EarningItemCategory[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const {isDarkMode} = useAppSelector(store => store.ui);
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();

  const items: DropdownItem[] = [
    {label: 'This Week', value: 'This Week'},
    {label: 'This Month', value: 'This Month'},
    {label: 'Previous Month', value: 'Previous Month'},
    {label: 'All Over', value: 'All Over'},
  ];

  const selectItem = (item: DropdownItem) => {
    setFilterVal(item.label);
    setOpen(false);
    setData([]);
    setPage(1);
    setHasMore(true);
  };

  const fetchData = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const {payload}: any = await dispatch(
        expenseStats({
          filter: filterVal,
          limit: 10,
          page: page,
        }),
      );

      const expenses = payload?.data?.expenses || [];
      const isEnd = expenses.length < 10;

      if (payload?.data?.success) {
        setData(prev => (page === 1 ? expenses : [...prev, ...expenses]));
        setHasMore(!isEnd);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, filterVal, page, hasMore, loading]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const allAmount =
    data?.find(item => item.category === 'All')?.totalExpense || 0;

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (open) {
          setOpen(false);
          Keyboard.dismiss();
        }
      }}>
      <View style={tw`flex-1 ${isDarkMode ? `bg-black` : `bg-white`} px-5`}>
        {/* Filter */}
        <View style={tw`w-full flex-row justify-end mt-5`}>
          <View style={tw`w-36 flex-row justify-end relative`}>
            <TouchableOpacity
              onPress={() => setOpen(!open)}
              style={tw`bg-[${colors.primary}] flex flex-row items-center justify-center gap-1.5 rounded-2xl px-4 py-2.5`}>
              <Icon name="filter" color={'white'} size={16} />
              <Text style={[tw`mb-1 text-white`, textStyle.fsrobo_16_400]}>
                {filterVal}
              </Text>
            </TouchableOpacity>

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

        {/* Header Card */}
        <View style={tw`mt-8`}>
          <BodyCard title="Expenses" amount={Number(allAmount)} />
        </View>

        {/* Divider */}
        <View style={tw`flex justify-center items-center`}>
          <View style={tw`w-52 h-[1px] bg-[${colors.lightBorder}] mt-8 mb-7`} />
        </View>

        {/* List */}
        <FlatList
          data={data}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={tw`gap-3 pb-12`}
          renderItem={({item}) => (
            <Pressable
              onPress={() =>
                navigation.navigate('Expenses Details', {
                  category: item.category,
                  filter: filterVal,
                })
              }>
              <EarningsCategoryItem
                source={item?.category}
                totalEarning={item?.totalExpense}
              />
            </Pressable>
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.6}
          ListFooterComponent={
            loading ? (
              <View style={tw`py-4`}>
                <ActivityIndicator size="small" color={colors.primary} />
              </View>
            ) : null
          }
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Expenses;
