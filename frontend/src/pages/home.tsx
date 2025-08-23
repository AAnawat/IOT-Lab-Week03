import { Container, Box, Flex } from "@mantine/core"
import NavBar from "../components/navBar"
import './home.css'
import myself from '../assets/images/me.jpg'

export default function HomePage() {

    return <NavBar>
        <Box className="mg-bt-nm" id="main-banner-home">
            <Container id="inside-banner">
                <h1>ยินดีต้อนรับสู่ IoT Library & Cafe</h1>
                <h3>ร้านกาแฟที่มีหนังสืออยู่นิดหน่อยให้คุณได้อ่าน</h3>
            </Container>
        </Box>
        <Box className="mg-bt-nm">
            <Container size={"xl"}>
                <Flex className="mg-bt-sm">
                    <Box id="info-us">
                        <h2>เกี่ยวกับเรา</h2>
                        <p>IoT Library & Cafe เป็นร้านกาแฟที่มีหนังสืออยู่นิดหน่อยให้คุณได้อ่าน และเรียนรู้เรื่องใหม่ๆ ที่เกี่ยวกับเทคโนโลยี IoT โดยคาเฟ่ของเรานั้น ก่อตั้งขึ้นโดย นายอนวัช ว่องประชานุกูล โค้ดชุดนี้เป็นโค้ดตัวอย่างในหัวข้อ Hono และ React ในวิชานี้</p>
                    </Box>
                    <img src={myself} alt="Anawat Wongprachanukul" id="img-myself" />
                </Flex>
                <p>Humungousaur is a large, dinosaur-like alien from the Ben 10 series, known for his immense size and strength. He is a Vaxasaurian with a humanoid body, brown and beige skin, and a long tail. Humungousaur can grow significantly in size, gaining more pronounced dinosaur features like Stegosaurus-like plates and spikes on his tail and back. The Omnitrix symbol is located on his chest. </p>
            </Container>
        </Box>
    </NavBar>
}