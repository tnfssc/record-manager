import {
  CloseIcon,
  HamburgerIcon,
  MoonIcon,
  SunIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { Link as WouterLink } from "wouter";

import { ROLES } from "../../../constants/auth";
import { auth, signOut, useAuth } from "../../lib/firebase";
import useRole from "../../use/role/index";

const NavLink: React.FC<{ to: string }> = ({ children, to }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    to={to}
    as={WouterLink}
  >
    {children}
  </Link>
);

const AuthButton: React.FC = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [user, loading] = useAuth();
  if (!user) {
    return (
      <Button
        variant="ghost"
        rounded={"full"}
        onClick={() => signInWithGoogle()}
        isLoading={loading}
        isDisabled={loading}
      >
        Sign in
      </Button>
    );
  }
  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={"full"}
        variant={"link"}
        cursor={"pointer"}
        minW={0}
      >
        <Avatar
          size={"sm"}
          src={user.photoURL ?? "https://avatars.dicebear.com/api/male/username.svg"}
        />
      </MenuButton>
      <MenuList alignItems={"center"}>
        <br />
        <Center>
          <Avatar
            size={"2xl"}
            src={user.photoURL ?? "https://avatars.dicebear.com/api/male/username.svg"}
          />
        </Center>
        <br />
        <Center>
          <p>{user.displayName}</p>
        </Center>
        <br />
        <MenuDivider />
        <MenuItem onClick={signOut}>Sign out</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default function Navbar({ children }: { children?: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [user] = useAuth();
  const role = useRole();

  const links = [
    {
      label: "Home",
      to: "/",
      secure: false,
    },
    {
      label: "Secure",
      to: "/secure",
      secure: true,
    },
    {
      label: "Users",
      to: "/users",
      secure: true,
      role: ROLES.ADMIN,
    },
  ];

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
            variant="ghost"
          />
          <HStack spacing={8} alignItems={"center"}>
            <WouterLink to="/">
              <Button cursor="pointer" variant="ghost">
                <TriangleUpIcon />
              </Button>
            </WouterLink>
            <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
              {links
                .filter(({ secure }) => user || !secure)
                .filter((e) => !e.role || e.role === role)
                .map(({ label, to }) => (
                  <NavLink to={to} key={to}>
                    {label}
                  </NavLink>
                ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode} variant="ghost">
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              <AuthButton />
            </Stack>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {links
                .filter(({ secure }) => user || !secure)
                .filter((e) => !e.role || e.role === role)
                .map(({ label, to }) => (
                  <NavLink to={to} key={to}>
                    {label}
                  </NavLink>
                ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Box p={4}>{children}</Box>
    </>
  );
}
