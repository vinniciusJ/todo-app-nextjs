import React from 'react'
import moment from 'moment'

import { Flex, Box, Checkbox, Heading, Tag, Divider, Text } from '@chakra-ui/react'

const Todo = ({ title, priority, createdAt, description, isDone }) => {
    const priorities = { 
        'low': { color: 'green', label: 'Low Priority' },
        'medium': { color: 'yellow', label: 'Medium Priority' },
        'high': { color: 'red', label: 'High Priority' }
    }

    return (
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
                <Checkbox pb={4} checked={isDone}>
                    <Heading as="h2" size="md" textDecor={isDone ? 'line-through' : 'none'}>{ title }</Heading>
                </Checkbox>
                
                <Flex as="section" gap={4} pb={4}>
                    <Tag 
                        borderRadius="full" 
                        variant="outline" 
                        w="8rem"
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
    )
}

export default Todo