import {View, FlatList, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from 'twrnc';
import EarningItem from '../../components/EarningItem/EarningItem';
import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks';
import {useRoute} from '@react-navigation/native';
import {allEarning} from '../../store/earning';
import {AllEarning} from '../../utils/types';
import EditModal from '../../components/EditModal';
import DeleteModal from '../../components/DeleteModal/DeleteModal';

const EarningDetails = () => {
  const {isDarkMode} = useAppSelector(store => store.ui);
  const route = useRoute();
  const {source, filter}: any = route.params;
  const dispatch = useAppDispatch();

  const [data, setData] = useState<AllEarning[]>([]);
  const [editData, setEditData] = useState<AllEarning | null>(null);
  const [deleteData, setDeleteData] = useState<AllEarning | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [openDeleteMoadal, setOpenDeleteMoadal] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const handelEarningDetails = async (pageNum = 1) => {
    try {
      const {payload}: any = await dispatch(
        allEarning({
          limit: 5,
          page: pageNum,
          filter: source,
          filterTime: filter,
        }),
      );

      if (payload?.data?.success) {
        const newData = payload?.data?.earnings || [];
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
    handelEarningDetails(1);
  }, []);

  const loadMoreData = () => {
    if (!loadingMore && hasMore) {
      const nextPage = page + 1;
      setLoadingMore(true);
      setPage(nextPage);
      handelEarningDetails(nextPage);
    }
  };

  const handelEdit = (item: AllEarning) => {
    setEditData(item);
    setModalVisible(true);
  };

  const handelDelete = (item: AllEarning) => {
    setDeleteData(item);
    setOpenDeleteMoadal(true);
  };

  const handelOnSuccess = (item: AllEarning) => {
    const index = data.findIndex(i => i.id === item.id);
    if (index !== -1) {
      const newData = [...data];
      newData[index] = item;
      setData(newData);
    }
  };

  const handelOnSuccessDelet = (item: AllEarning) => {
    setData(prev => prev.filter(i => i.id !== item.id));
  };

  return (
    <View style={tw`${isDarkMode ? `bg-black` : `bg-white`} flex-1`}>
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
            type="Earning"
            item={item}
            onDelete={() => handelDelete(item)}
            onEdit={() => handelEdit(item)}
          />
        )}
      />

      {editData && (
        <EditModal
          title="Earning"
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          data={editData}
          onSuccess={handelOnSuccess}
          isEarning={true}
        />
      )}

      <DeleteModal
        visible={openDeleteMoadal}
        onClose={() => setOpenDeleteMoadal(false)}
        data={deleteData as AllEarning}
        onSuccess={handelOnSuccessDelet}
        isEarning={true}
      />
    </View>
  );
};

export default EarningDetails;
