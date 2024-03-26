import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { AppstoreOutlined, UserOutlined, CalendarOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { AiFillSignal } from "react-icons/ai";
const { Header, Content, Sider } = Layout;

const LayoutAdmin: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Header
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Link to={"/"}></Link>
            </Header>
            <Layout>
                <Sider
                    style={{ width: "100px", height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0, marginTop: "60px", paddingTop: "20px" }}
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={(broken) => {
                        console.log(broken);
                    }}
                >
                    <div />
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={["10"]}
                        items={[
                            {
                                key: 1,
                                icon: <AppstoreOutlined />,
                                label: <Link to={"/"}>DashBoard</Link>,
                            },
                            {
                                key: 2,
                                icon: <AiFillSignal />,
                                label: <Link to={"/user"}>Tài khoản</Link>,
                            },
                            {
                                key: 3,
                                icon: <CalendarOutlined />,
                                label: <Link to={"/list"}>Danh mục</Link>,
                            },
                            {
                                key: 4,
                                icon: <UserOutlined />,
                                label: "Quản lý tài khoản",
                                children: [
                                    { key: 5, icon: <UserOutlined />, label: <Link to={"/sigin"}>Đăng ký</Link> },
                                    { key: 6, icon: <UserOutlined />, label: <Link to={"/login"}>Đăng nhập</Link> }
                                ]

                            }
                        ]}
                    />
                </Sider>
                <Content style={{ margin: "24px 16px 0", marginLeft: 230 }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: "100%",
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};
export default LayoutAdmin;