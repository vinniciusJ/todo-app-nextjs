import React, { useRef, useState } from 'react'
import moment from 'moment'
import TodoPopup from './TodoPopup'

import { api } from '../services/api'
import { Menu as MenuIcon, Edit, Trash2 } from 'react-feather'
import { Flex, Box, Checkbox, Heading, Tag, Divider, Text, IconButton, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'

const Todo = ({ _id, title, priority, createdAt, description, isDone }) => {
    const priorities = { 
        'low': { color: 'green', label: 'Low Priority' },
        'medium': { color: 'yellow', label: 'Medium Priority' },
        'high': { color: 'red', label: 'High Priority' }
    }

    const [ isDoneStatus, setIsDoneStatus ] = useState(isDone)
    const todoPopupRef = useRef(null)

    const openPopupToEdit = () => todoPopupRef.current.openTodoPopup()

    const checkTodoTask = async () => {
        await api.put('/todo', { data: { _id, title, priority, description, isDone: !isDoneStatus } })

        setIsDoneStatus(!isDoneStatus)
    }   
    const deleteTodoTask = async () => await api.delete('/todo', { data: { _id } })

    return (
        <>
            <Box 
                w="xs" 
                borderWidth={1} 
                borderColor="gray.300" 
                bg="gray.100" 
                borderRadius={8} 
                p={4}
                transition="ease-in"
                transitionDuration=".5s"
                _hover={{
                    bg: 'gray.300'
                }}
            >
                <Box as="header">
                    <Flex justify="space-between" alignItems="center">
                        <Checkbox pb={4}  onChange={checkTodoTask} isChecked={isDoneStatus}>
                            <Heading as="h2" size="md" textDecor={isDone ? 'line-through' : 'none'}>{ title }</Heading>
                        </Checkbox>

                        <Menu>
                            <MenuButton
                                as={IconButton}
                                aria-label='Options'
                                icon={<MenuIcon color="#285E61" size={18}/>}
                                variant='none'
                                mt={-4}
                            />
                            <MenuList>
                                <MenuItem icon={<Edit size={16}/>} fontSize={16} onClick={openPopupToEdit}> 
                                    Edit
                                </MenuItem>
                                <MenuItem icon={<Trash2 size={16}/>} fontSize={16} onClick={deleteTodoTask}>
                                    Delete
                                </MenuItem>
                
                            </MenuList>
                            </Menu>
                    </Flex>
                    
                    <Flex as="section" gap={4} pb={4}>
                        <Tag 
                            borderRadius="full" 
                            variant="outline" 
                            w={32}
                            colorScheme={priorities[priority].color}
                        >
                            { priorities[priority].label }
                        </Tag>
                        <Tag
                            borderRadius="full" 
                            variant="outline" 
                            colorScheme="gray"
                        >
                            { moment(createdAt).format('DD/MM/YYYY') }
                        </Tag>
                    </Flex>
                </Box>
                <Divider mb={4}/>
                <Box>
                    <Text size="xl">{ description }</Text>
                </Box>
            </Box>
                
            <TodoPopup _id={_id} title={title} priority={priority} description={description} ref={todoPopupRef}/>
        </>
    )
}

export default Todo