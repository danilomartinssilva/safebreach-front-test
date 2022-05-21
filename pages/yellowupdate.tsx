import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Heading, Stack, Text, VStack } from "@chakra-ui/layout";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from "axios";
import { format, parseISO } from 'date-fns';
import { NextPage } from "next";
import Router, { useRouter, withRouter } from 'next/router';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import IContact from "../src/types/IContact";


const  YellowUpdate:NextPage=()=>{
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    birthday:Yup.date().required('Birthday is required'),
    address: Yup.string()
      .required('Address is required').min(10),
    phone:Yup.string().required("Phone is required"),      
  });

  const [contact,setContact] = useState<IContact>()
  const {query} = useRouter()
  const userId = query as Pick<IContact,"_id">  
  const {register,handleSubmit,reset, formState:{errors}} = useForm({
    resolver:yupResolver(validationSchema),
  
  })

  useEffect(()=>{
    async function findById(){
    
      if(userId){
        const request = await axios.get('http://192.168.3.15:3339/api/v1/users/'+userId._id)
        const response = request.data
        setContact(response)
        reset(contact)
      }
    }
    findById()

  },[userId._id])

  const onSubmit =async (data:any) => {
    const request = await axios.put('http://192.168.3.15:3339/api/v1/users/',{
      data:{ ...data,_id:contact?._id}
    })
    const response = request.data
    setContact(response)
    Router.push({pathname:"/yellowlist"})
  } 
    return (
      
      <VStack as="form"    
      mx="auto"
      my="16px"
      maxW="850px"
      h="100vh"
      justifyContent="flex-start"
      >
        <Heading> Update Contact </Heading>
              <Stack maxW="850px" w={["xs","container.xl"]} spacing={4}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input  id="name" placeholder="enter your name..." 
                  defaultValue = {contact?.name}
                  {...register("name")}

                  />
                  <Text color = "red" > {errors?.name?.message}</Text>              
                </FormControl>  
                {contact?.birthday && (              
                  <FormControl>
                    <FormLabel>Birthday</FormLabel>
                    <Input  id="birthday" placeholder="enter your birthday..." type="text" 
                    defaultValue = {format(parseISO(contact?.birthday?.split('T')[0] as string).getTime(),"yyyy-MM-dd")}
                    {...register("birthday")}

                    />    
                            
                  </FormControl>    
                )}  

                  <FormControl>
                    <FormLabel>Address</FormLabel>
                    <Input  id="address" placeholder="enter your address..." type="text" 
                    defaultValue = {contact?.address}
                    {...register("address")}
                    />       
                    <Text color = "red" > {errors?.address?.message}</Text>                    
                  </FormControl>    
                  <FormControl>
                    <FormLabel>Phone</FormLabel>
                    <Input  id="phone" placeholder="enter your phone..." type="tel" 
                    defaultValue = {contact?.phone_number}
                    {...register("phone")}

                    />      
                      <Text color = "red" > {errors?.phone?.message}</Text>          
                  </FormControl>    
                <Button maxW="850px" bg="green" isDisabled = {Boolean(Object.keys(errors).length)} onClick = {handleSubmit(onSubmit)}> Send  </Button>
              </Stack>        
      </VStack>
    )
}

export default withRouter(YellowUpdate);