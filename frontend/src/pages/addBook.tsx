import NavBar from "../components/navBar";
import { isNotEmpty, useForm } from '@mantine/form';
import { Textarea, TextInput, Group, Button, Divider, Container, TagsInput} from "@mantine/core";
import './addBook.css'
import { useState } from "react";
import apiCaller from "../services/axios";
import { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { DateTimePicker } from "@mantine/dates";

export default function AddBook() {
    const [loading, setLoading] = useState(false)
    const [tags, setTags] = useState<string[]>([])
    const navigate = useNavigate()

    const form = useForm({
            mode: 'uncontrolled',
            initialValues: {
            name: '',
            author: '',
            desc: '',
            syno: '',
            publish: new Date()
        },

        validate: {
            name: (value) => (/.+/.test(value) ? null : 'กรุณาระบุชื่อหนังสือ'),
            author: (value) => (/.+/.test(value) ? null : 'กรุณาระบุชื่อผู้แต่ง'),
            desc: (value) => (/.+/.test(value) ? null : 'กรุณาระบุคำอธิบาย'),
            syno: (value) => (/.+/.test(value) ? null : 'กรุณาระบุเรื่องย่อ'),
            publish: isNotEmpty("กรุณาระบุวันแต่ง")
        },
    });

    const handleAddBook = () => {
        setLoading(true)
        const { name, author, desc, syno, publish } = form.getValues()

        apiCaller({
            method: 'post',
            url: '/books',
            data: {
                title: name,
                author: author,
                description: desc,
                synopsis: syno,
                publishedAt: publish,
                genres: tags
            }
        })
        .then(() => {
            notifications.show({
                title: "เพิ่มข้อมูลหนังสือสำเร็จ",
                message: "ข้อมูลหนังสือได้รับการเพิ่มเรียบร้อยแล้ว",
            })
            navigate('/books')
        })
        .catch((error) => {
            if (error instanceof AxiosError) {
                if (error.response?.status === 400) {
                notifications.show({
                    title: "ข้อมูลไม่ถูกต้อง",
                    message: "กรุณาตรวจสอบข้อมูลที่กรอกใหม่อีกครั้ง",
                    color: "red",
                });
                } else if (error.response?.status || 500 >= 500) {
                notifications.show({
                    title: "เกิดข้อผิดพลาดบางอย่าง",
                    message: "กรุณาลองใหม่อีกครั้ง",
                    color: "red",
                });
                }
            } else {
                notifications.show({
                title: "เกิดข้อผิดพลาดบางอย่าง",
                message: "กรุณาลองใหม่อีกครั้ง หรือดูที่ Console สำหรับข้อมูลเพิ่มเติม",
                color: "red",
                });
            }
        })
        .finally(() => {
            setLoading(false)
        })
    }

    return <NavBar>
        <Container mt={20}>
            <h2 className="mg-bt-sm">เพิ่มหนังสือในระบบ</h2>
            <form className="space-form-nm" onSubmit={form.onSubmit(handleAddBook)}>
                <TextInput label="ชื่อหนังสือ" placeholder="ชื่อหนังสือ" key={form.key('name')} {...form.getInputProps('name')}/>
                <TextInput label="ชื่อผู้แต่ง" placeholder="ชื่อผู้แต่ง" key={form.key('author')} {...form.getInputProps('author')}/>
                <TextInput label="คำอธิบาย" placeholder="คำอธิบายหนังสือ" key={form.key('desc')} {...form.getInputProps('desc')} />
                <Textarea label="เรื่องย่อ" placeholder="เรื่องย่อ" key={form.key('syno')} rows={10} {...form.getInputProps('syno')} />
                <DateTimePicker label="วันที่พิมพ์" placeholder="Pick date and time" key={form.key('publish')} {...form.getInputProps('publish')} />
                <TagsInput label="หมวดหมู่" value={tags} onChange={setTags} placeholder="Enter tag" />
                <Divider mt={20} />
                <Group justify="flex-start" mt="md">
                    <Button type="submit" loading={loading}>บันทึกข้อมูล</Button>
                </Group>
            </form>
        </Container>
    </NavBar>
}