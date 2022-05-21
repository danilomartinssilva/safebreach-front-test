import { Flex, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import loadingJson from '../src/assets/animations/loading.json';
import { SearchBox } from "../src/components/SearchBox";
import TableYellow from "../src/components/TableYellow";
import api from '../src/config/api';
import IContact from "../src/types/IContact";
import IContactQuery from "../src/types/IContactQuery";

const  YellowList:NextPage=()=>{
  const [contacts,setContacts] = useState<IContact[]>()
  const [loadingFetchAll,setLoadingFetchAll] = useState<boolean>(false)
  const [loadingQuery,setLoadingQuery] = useState<boolean>(false)
  const toast = useToast()

  useEffect(()=>{
    loadContacts()
  },[])
  
  async function loadContacts(){
    setLoadingFetchAll(true)
    await later(3000)
    const request = await api.get('/users');
    const response = request.data
    setLoadingFetchAll(false)
    setContacts(response)
    }
    
  async function removeContact(id:string){
   
    const request = await api.delete('/users/'+id);
    const response = request.data
    loadContacts()
    
   
   
    toast({
      title: 'Deleted Contact...',
      description: "A contact has been deleted by you",
      status: 'error',
      duration: 2000,
      position: "top-right"
    })
  }


  function later(delay:number) {
    return new Promise(function(resolve) {
        setTimeout(resolve, delay);
    });
}
  
  const handleSearch = useCallback( async(query:IContactQuery)=>{
    setLoadingQuery(true)    
    const request = await api.post('/users/search',{
      data: {...query}
    })
    const response = request.data
    setLoadingQuery(false) 
    setContacts(response)
  },[])


  const renderSkeletonLoading = ()=>{
    return (
      <Flex h="100vh" justifyContent="center" >

        <Lottie
        loop
        animationData={loadingJson}
        play
        style={{ width: "100%", height: "100%" }}
      />
      </Flex>
    )
  }
   
  return (

    <>
     {loadingFetchAll ? renderSkeletonLoading() : (
     <Flex direction="column" >
      <Flex w="100%" my="6" maxW="1400" mx = "auto" paddingX="6">
      <Flex flex="1" align="center" flexDirection="column">
          <SearchBox loading = {loadingQuery} handleSubmit = {handleSearch}  />
          {contacts?.length ? (
              <TableYellow data = {contacts} removeContact = {removeContact} />
          ):(
            <Text>Contacts Not Found</Text>
          )}
        </Flex>
      </Flex>

    </Flex>
       )}
    </>
   
  )
}

export default YellowList;