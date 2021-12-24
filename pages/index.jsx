import React, { useRef, useMemo } from 'react'
import Todo from '../components/Todo'
import TodoPopup from '../components/TodoPopup'
import useSWR from 'swr'

import { Flex, Box, Heading,Button } from '@chakra-ui/react'
import { api } from '../services/api'

const Home = ({ tasks }) => {
	const fetcher = async url => (await api.get(url)).data
	
	const todoPopupRef = useRef(null)
	const { data } = useSWR('/todo', fetcher, { fallbackData: tasks, refreshInterval: 1000 })
	
	const tasksToDo = useMemo(() => data.filter(task => !task.isDone))
	const doneTasks = useMemo(() => data.filter(task => task.isDone))

	const openTodoPopup = () => todoPopupRef.current.openTodoPopup()

	return (
		<Flex 
			as="main"
			flexDirection="column" 
			gap={8} 
			px={20}
			py={12}
			
			h="100vh"
			bgColor="gray.50"
		>
			<Box as="section">
				<Flex as="header" justifyContent="space-between">
					<Heading as="h1"size="xl" pb={12}>
						To Do
					</Heading>
					<Button variant="outline" colorScheme="teal" onClick={openTodoPopup}>+</Button>

					<TodoPopup ref={todoPopupRef}/>
				</Flex>

				<Flex as="section" flexWrap="wrap" gap={8}>

					{ tasksToDo.map(task => (
						<Todo {...task}/>
					)) }
					
				</Flex>
			</Box>
			<Box as="section">
				<Heading as="h1"size="xl" mb={10}>
					Done
				</Heading>

				<Flex as="section" flexWrap="wrap" gap={8}>

					{ doneTasks.map(task => (
						<Todo {...task}/>
					)) }
					
				</Flex>
			</Box>
		</Flex>
	)
}

export const getStaticProps = async context => {
	const data = await (await api.get('/todo')).data

	return {
		props: {
			tasks: data
		},
		revalidate: 1
	}
}

export default Home
