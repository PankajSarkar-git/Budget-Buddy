
import {FlatList, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks';
import tw from 'twrnc';
import {allExpense} from '../../store/expense';
import {AllExpense} from '../../utils/types';
import {useRoute} from '@react-navigation/native';
import EarningItem from '../../components/EarningItem/EarningItem';
import DeleteModal from '../../components/DeleteModal/DeleteModal';
import EditModal from '../../components/EditModal';

const ExpensesDetails = () => {
  const {isDarkMode} = useAppSelector(store => store.ui);
  const route = useRoute();
  const {category, filter}: any = route.params;
  const dispatch = useAppDispatch();
  const [data, setData] = useState<AllExpense[]>([]);
  const [editData, setEditData] = useState<AllExpense | null>(null);
  const [deleteData, setDeleteData] = useState<AllExpense | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [openDeleteMoadal, setOpenDeleteMoadal] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const handelExpenseDetails = async (pageNum = 1) => {
    try {
      const {payload}: any = await dispatch(
        allExpense({
          limit: 10,
          page: pageNum,
          filter: category,
          filterTime: filter,
        }),
      );
      if (payload?.data?.success) {
        const newData = payload?.data?.expenses || [];
        if (pageNum === 1) {
          setData(newData);
        } else {
          setData(prev => [...prev, ...newData]);
        }

        if (newData.length < 10) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    handelExpenseDetails(1);
  }, []);

  const loadMoreData = () => {
    if (!loadingMore && hasMore) {
      const nextPage = page + 1;
      setLoadingMore(true);
      setPage(nextPage);
      handelExpenseDetails(nextPage);
    }
  };

  const handelEdit = (item: AllExpense) => {
    setEditData(item);
    setModalVisible(true);
  };

  const handelDelete = (item: AllExpense) => {
    setDeleteData(item);
    setOpenDeleteMoadal(true);
  };

  const handelOnSuccess = (item: AllExpense) => {
    const index = data.findIndex(i => i.id === item.id);
    if (index !== -1) {
      const newData = [...data];
      newData[index] = item;
      setData(newData);
    }
  };

  const handelOnSuccessDelet = (item: AllExpense) => {
    setData(prev => prev.filter(i => i.id !== item.id));
  };

  return (
    <View style={tw`${isDarkMode ? 'bg-black' : 'bg-white'} flex-1`}>
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={tw`gap-3 pb-12`}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? (
            <View style={tw`py-4`}>
              <Text style={tw`text-center text-gray-500`}>Loading...</Text>
            </View>
          ) : null
        }
        renderItem={({item}) => (
          <EarningItem
            type="Expenses"
            item={item}
            onDelete={() => handelDelete(item)}
            onEdit={() => handelEdit(item)}
          />
        )}
      />

      {editData && (
        <EditModal
          title="Expences"
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          data={editData}
          onSuccess={handelOnSuccess}
          isEarning={false}
        />
      )}
      <DeleteModal
        visible={openDeleteMoadal}
        onClose={() => setOpenDeleteMoadal(false)}
        data={deleteData as AllExpense}
        onSuccess={handelOnSuccessDelet}
        isEarning={false}
      />
    </View>
  );
};

export default ExpensesDetails;
