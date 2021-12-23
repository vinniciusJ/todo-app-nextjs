import React from 'react'

import { Flex, Box, Checkbox, Heading, Tag, Divider, Text } from '@chakra-ui/react'

const Todo = ({ title, priority, createdAt, description, isDone }) => {
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
                        colorScheme="red"
                    >
                        { priority }
                    </Tag>
                    <Tag
                        borderRadius="full" 
                        variant="outline" 
                        colorScheme="gray"
                    >
                        { createdAt }
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