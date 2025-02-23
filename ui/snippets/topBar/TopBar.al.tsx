import {
  Box,
  Image,
  Text,
  Flex,
  Link,
  Stack,
  Divider,
  useColorModeValue,
  // useDisclosure,
  // Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Skeleton,
  Icon,
  // Avatar,
  // IconButton,
  // Center,
} from '@chakra-ui/react';
import React from 'react';

import { route } from 'nextjs-routes';

import config from 'configs/app';
import { alNetworkConfig } from 'configs/app/al_config';
import { updatePublicApi } from 'configs/app/api';
import IconSvg from 'ui/shared/IconSvg';
import NavLinkIcon from 'ui/snippets/navigation/NavLinkIcon';

import DeFiDropdown from './DeFiDropdown';
import Settings from './settings/Settings';
// import TopBarStats from './TopBarStats';

const feature = config.features.deFiDropdown;

interface Props {
  isCollapsed?: boolean;
  onClick?: (event: React.SyntheticEvent) => void;
  className?: string;
}

const LogoFallback = ({ isCollapsed, isSmall }: { isCollapsed?: boolean; isSmall?: boolean }) => {
  const field = isSmall ? 'icon' : 'logo';
  const logoColor = useColorModeValue('blue.600', 'white');

  const display = isSmall ? {
    base: 'none',
    lg: isCollapsed === false ? 'none' : 'block',
    xl: isCollapsed ? 'block' : 'none',
  } : {
    base: 'block',
    lg: isCollapsed === false ? 'block' : 'none',
    xl: isCollapsed ? 'none' : 'block',
  };

  if (config.UI.sidebar[field].default) {
    return <Skeleton w="100%" borderRadius="sm" display={ display }/>;
  }

  return (
    <IconSvg
      name={ isSmall ? 'networks/icon-placeholder' : 'networks/logo-placeholder' }
      width="auto"
      height="100%"
      color={ logoColor }
      display={ display }
    />
  );
};

const apiNavMenuItems = {
  respApi: {
    text: 'REST API',
    nextRoute: { pathname: '/api-docs' as const },
    icon: 'restAPI',
    isActive: false,
  },
  graphQL: {
    text: 'GraphQL',
    nextRoute: { pathname: '/graphiql' as const },
    icon: 'graphQL',
    isActive: false,
  },
};

const AdventureLogo = ({ isCollapsed, onClick, className }: Props) => {
  const logoSrc = '/static/al_logo.svg';
  const iconSrc = '/static/al_logo.svg';
  // const logoSrc = useColorModeValue(config.UI.sidebar.logo.default, config.UI.sidebar.logo.dark || config.UI.sidebar.logo.default);
  // const iconSrc = useColorModeValue(config.UI.sidebar.icon.default, config.UI.sidebar.icon.dark || config.UI.sidebar.icon.default);
  const darkModeFilter = { filter: 'brightness(0) invert(1)' };
  const logoStyle = useColorModeValue({}, !config.UI.sidebar.logo.dark ? darkModeFilter : {});
  const iconStyle = useColorModeValue({}, !config.UI.sidebar.icon.dark ? darkModeFilter : {});

  return (
    <Box
      className={ className }
      as="a"
      href={ route({ pathname: '/' }) }
      width={{ base: '120px', lg: isCollapsed === false ? '120px' : '30px', xl: isCollapsed ? '30px' : '120px' }}
      height={{ base: '24px', lg: isCollapsed === false ? '24px' : '30px', xl: isCollapsed ? '30px' : '24px' }}
      display="inline-flex"
      // overflow="hidden"
      onClick={ onClick }
      // flexShrink={ 0 }
      aria-label="Link to main page"
    >
      { /* big logo */ }
      <Image
        w="auto"
        h="100%"
        src={ logoSrc }
        alt={ `${ config.chain.name } network logo` }
        fallback={ <LogoFallback isCollapsed={ isCollapsed }/> }
        display={{ base: 'block', lg: isCollapsed === false ? 'block' : 'none', xl: isCollapsed ? 'none' : 'block' }}
        style={ logoStyle }
      />
      { /* small logo */ }
      <Image
        w="auto"
        h="100%"
        src={ iconSrc }
        alt={ `${ config.chain.name } network logo` }
        fallback={ <LogoFallback isCollapsed={ isCollapsed } isSmall/> }
        display={{ base: 'none', lg: isCollapsed === false ? 'none' : 'block', xl: isCollapsed ? 'block' : 'none' }}
        style={ iconStyle }
      />
    </Box>
  );
};

const DropDownIcon = (props: any) => (
  <Icon width="9" height="6" viewBox="0 0 9 6" fill="none" { ...props }>
    <path d="M8 1.5L4.5 5L1 1.5" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Icon>
);

const TopBar = () => {
  const bgColor = useColorModeValue('white.50', 'whiteAlpha.100');

  const handleChangeNetwork = (name: string) => {
    if (name in alNetworkConfig) {
      updatePublicApi(alNetworkConfig[name]);
      if (typeof window !== 'undefined') {
        localStorage.setItem('al_network', name);
      }
      window.location.reload();
    }
  };
  // const handleSwitchL2 = function() {
  //   return handleChangeNetwork('l2');
  // };
  // const handleSwitchShard1 = function() {
  //   return handleChangeNetwork('shard1');
  // };
  // const handleSwitchShard2 = function() {
  //   return handleChangeNetwork('shard2');
  // };

  return (
    <Flex
      py={ 2 }
      px={{ base: 3, lg: 6 }}
      bgColor={ bgColor }
      justifyContent="space-between"
      alignItems="center"
      height="58px"
    >
      <AdventureLogo isCollapsed={ false }/>
      { /* <TopBarStats/> */ }
      <Stack direction="row" spacing={{ base: 4, lg: 6 }}>
        <Link
          alignSelf="center" fontSize="14px" fontWeight={ 600 } color="#000"
          textDecoration="none" _hover={{ color: '#000', textDecoration: 'none' }}
          href="/blocks">Blocks</Link>
        <Link alignSelf="center" fontSize="14px" fontWeight={ 600 } color="#000"
          textDecoration="none" _hover={{ color: '#000', textDecoration: 'none' }}
          href="/txs">Transactions</Link>
        <Link alignSelf="center" fontSize="14px" fontWeight={ 600 } color="#000"
          textDecoration="none" _hover={{ color: '#000', textDecoration: 'none' }}
          href="/tokens">Token</Link>
        <Menu>
          <MenuButton paddingX={ 0 }
            fontSize="14px" fontWeight={ 600 }
            color="#000" background="#fff" _hover={{ background: '#fff' }}>
              APIs
            <DropDownIcon width="2" marginLeft="1"/>
          </MenuButton>
          <MenuList>
            <MenuItem fontSize="14px" fontWeight={ 600 } as="a"
              href="/api-docs">
              <NavLinkIcon item={ apiNavMenuItems.respApi }/>
              <Text marginLeft={ 1 }>Rest API</Text>
            </MenuItem>
            <MenuItem fontSize="14px" fontWeight={ 600 } as="a"
              href="/graphiql">
              <NavLinkIcon item={ apiNavMenuItems.graphQL }/>
              <Text marginLeft={ 1 }>GraphQL</Text>
            </MenuItem>
            { /* 根据需要添加更多二级菜单项 */ }
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton paddingX={ 0 }
            fontSize="14px" fontWeight={ 600 }
            color="#000" background="#fff" _hover={{ background: '#fff' }}>
              Networks
            <DropDownIcon width="2" marginLeft="1"/>
          </MenuButton>
          <MenuList>
            { Object.keys(alNetworkConfig).map(key => {
              const item = alNetworkConfig[key];
              // eslint-disable-next-line react/jsx-wrap-multilines
              return <MenuItem fontSize="14px" fontWeight={ 600 } as="a" key={ `mi-${ key }` }
                // eslint-disable-next-line react/jsx-no-bind
                onClick={ () => {
                  handleChangeNetwork(key);
                } }
                href="#">
                { /* <NavLinkIcon item={ apiNavMenuItems.respApi }/> */ }
                <Text marginLeft={ 1 }>{ item['name'] }</Text>
              </MenuItem>;
            }) }
            { /* <MenuItem fontSize="14px" fontWeight={ 600 } as="a"
              // eslint-disable-next-line react/jsx-no-bind
              onClick={ handleSwitchShard2 }
              href="#">
              <Text marginLeft={ 1 }>Shard 2</Text>
            </MenuItem> */ }
          </MenuList>
        </Menu>
      </Stack>
      <Flex alignItems="center">
        { feature.isEnabled && (
          <>
            <DeFiDropdown/>
            <Divider mr={ 3 } ml={{ base: 2, sm: 3 }} height={ 4 } orientation="vertical"/>
          </>
        ) }
        <Settings/>
      </Flex>
    </Flex>
  );
};

export default React.memo(TopBar);
