import type React from "react";
import websiteLogo from "../assets/images/logos/website-logo.png"
import { Link } from 'react-router-dom'
import { Flex, Group } from "@mantine/core";
import './navBar.css'

interface basicProps {
    children: React.ReactNode
}

export default function NavBar({ children }: basicProps) {
    return <>
        <Flex justify={"space-around"} className="navBar">
            <img className="web-logo" src={websiteLogo} alt="IOT Logo" />
            <Group gap={"xl"}>
                <Link to={"/"}>หน้าหลัก</Link>
                <Link to={"/books"}>หนังสือ</Link>
            </Group>
        </Flex>
        {children}
    </>
}