import { Layout, Menu, Input, Avatar, Dropdown, Space } from "antd";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const { Header, Content } = Layout;

const Logo = styled.div`
  font-weight: 700;
  font-size: 18px;
  color: #fff;
`;

const HeaderBar = styled(Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const SearchWrapper = styled.div`
  flex: 1;
  max-width: 360px;
  margin: 0 16px;
`;

const ContentWrap = styled(Content)`
  padding-top: 16px;
`;

const menuItems = [
  { key: "/", label: <Link to="/">Explore</Link> },
  { key: "/library", label: <Link to="/library">Library</Link> },
  { key: "/creator", label: <Link to="/creator/dashboard">Creator</Link> },
  { key: "/admin", label: <Link to="/admin/creators">Admin</Link> },
];

const getSelectedKey = (pathname: string) => {
  if (pathname === "/") return "/";
  const match = menuItems.find((item) => item.key !== "/" && pathname.startsWith(item.key));
  return match?.key;
};

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const selected = getSelectedKey(location.pathname);

  return (
    <Layout>
      <HeaderBar>
        <Space size="middle">
          <Logo>FanTube</Logo>
        </Space>
        <SearchWrapper>
          <Input.Search placeholder="Search creators and posts" />
        </SearchWrapper>
        <Menu mode="horizontal" theme="dark" selectedKeys={selected ? [selected] : []} items={menuItems} />
        <Dropdown
          placement="bottomRight"
          menu={{
            items: [
              { key: "settings", label: <Link to="/settings">Settings</Link> },
              { key: "logout", label: "Logout" },
            ],
          }}
        >
          <Avatar style={{ marginLeft: 16, cursor: "pointer" }}>U</Avatar>
        </Dropdown>
      </HeaderBar>
      <ContentWrap>{children}</ContentWrap>
    </Layout>
  );
};
