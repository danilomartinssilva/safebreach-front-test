import { Flex, Heading, VStack } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/react';
import { NextPage } from 'next';
import Router, { useRouter, withRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Lottie from 'react-lottie-player';
import loadingJson from '../src/assets/animations/loading.json';
import FormUpdateContact from '../src/components/Form/Update';
import api from '../src/config/api';
import IContact from '../src/types/IContact';
import later from '../src/utils/later';

const YellowUpdate: NextPage = () => {
  const [contact, setContact] = useState<IContact>();
  const [fetchLoading, setFetchLoading] = useState<boolean>(true);
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const { query } = useRouter();
  const userId = query as Pick<IContact, '_id'>;
  const toast = useToast();

  useEffect(() => {
    async function findById() {
      setFetchLoading(true);
      await later(4000);

      if (userId) {
        const request = await api.get(`users/${userId._id}`);
        setFetchLoading(false);
        const response = request.data;

        setContact(response);
      }
    }
    findById();
  }, [userId._id]);

  const renderSkeletonLoading = () => {
    return (
      <Flex h="100vh" justifyContent="center">
        <Lottie
          loop
          animationData={loadingJson}
          play
          style={{ width: '100%', height: '100%' }}
        />
      </Flex>
    );
  };
  const onSubmit = async (data: any) => {
    setUpdateLoading(true);
    await later(2000);
    const request = await api.put('/users', {
      data: { ...data, _id: contact?._id },
    });
    const response = request.data;
    setContact(response);
    setUpdateLoading(false);
    toast({
      title: 'Updated Contact...',
      description: 'A contact has been updated by you',
      status: 'success',
      duration: 2000,
      position: 'top-right',
    });
    await later(2000);
    Router.push({ pathname: '/yellowlist' });
  };
  return (
    <>
      {fetchLoading ? (
        renderSkeletonLoading()
      ) : (
        <VStack
          as="form"
          mx="auto"
          my="16px"
          maxW="850px"
          h="100vh"
          justifyContent="flex-start"
        >
          <Heading> Update Contact </Heading>
          <FormUpdateContact
            updateLoading={updateLoading}
            fetchLoading={fetchLoading}
            contact={contact}
            onSubmit={onSubmit}
          />
        </VStack>
      )}
    </>
  );
};

export default withRouter(YellowUpdate);
