import NavBar from "../components/navBar"
import "./books.css"
import { useEffect, useState } from "react"
import { Box,
         Container,
         Flex,
         Button,
         Loader,
         Alert,
         Stack
    } from "@mantine/core"
import apiCaller from "../services/axios";
import BookCard from "../components/bookCard";
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";

interface bookData {
    id: number
    title: string
    description: string
}

export default function BooksPage() {
    const [data, setData] = useState<bookData[]>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        setError(false);

        apiCaller.get("/books")
            .then((books) => {
                console.log(books.data.result)
                setData(books.data.result);
            })
            .catch((e) => {
                console.log("Can't get books", e)
                setError(true)
            })
            .finally(() => {
                setLoading(false)
            })   
    }, [])

    return <NavBar>
        <Box className="mg-bt-nm" id="main-banner-books">
            <Container id="inside-banner">
                <h1>หนังสือ</h1>
                <h3>รายการหนังสือทั้งหมด</h3>
            </Container>
        </Box>
        <Box>
            <Container size={"xl"}>
                <Flex justify={"space-between"} className="mg-bt-nm">
                    <h2>รายการหนังสือ</h2>
                    <Button component={Link} to={"/books/create"}>+ เพิ่มหนังสือ</Button>
                </Flex>
                <Box mb={20}>
                   {!error && loading && (
                    <Box id="loading-box">
                        <Loader/>
                        <p>กำลังโหลด...</p>
                    </Box>
                   )} 
                   {error && (
                    <Box>
                        <Alert variant="light" color="red" title="Can't fetch api">
                            เกิดข้อผิดพลาดในการดึงข้อมูลจากระบบ
                        </Alert>
                    </Box>
                   )}
                   {!!data && !error && !loading && (
                    <Stack>
                        {data.map((book: bookData) => (
                            <BookCard key={book.id} name={book.title} desc={book.description} onClick={() => {navigate(`/books/${book.id}`)}}/>
                        ))}
                    </Stack>
                   )}
                </Box>
            </Container>
        </Box>
    </NavBar>
}