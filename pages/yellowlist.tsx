import { Flex } from "@chakra-ui/layout";
import axios from "axios";
import { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { SearchBox } from "../src/components/SearchBox";
import TableYellow from "../src/components/TableYellow";
import IContact from "../src/types/IContact";
import IContactQuery from "../src/types/IContactQuery";


const  YellowList:NextPage=()=>{
  const [contacts,setContacts] = useState<IContact[]>()

  useEffect(()=>{
    
   async function loadContacts(){

    const request = await axios.get('http://192.168.3.15:3339/api/v1/users')
    const response = request.data
    setContacts(response)
    }
    loadContacts()

  },[])

  
  const handleSearch = useCallback( async(query:IContactQuery)=>{
    const request = await axios.post('http://192.168.3.15:3339/api/v1/users/search',{
      data: {...query}
    })
    const response = request.data
    setContacts(response)
  },[])
   
  return (
    <Flex direction="column" >
      <Flex w="100%" my="6" maxW="1400" mx = "auto" paddingX="6">
      <Flex flex="1" align="center" flexDirection="column">
          <SearchBox handleSubmit = {handleSearch}  />
          {contacts?.length && (
              <TableYellow data = {contacts} />
          )}

         
        </Flex>
      </Flex>
    </Flex>
  )
}

export default YellowList;