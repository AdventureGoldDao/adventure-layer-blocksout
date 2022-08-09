import { Box, Button, HStack, Link, Text, useDisclosure } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import React, { useCallback, useState } from 'react';

import type { TApiKeyItem } from 'data/apiKey';
import { apiKey } from 'data/apiKey';
import { space } from 'lib/html-entities';
import ApiKeyModal from 'ui/apiKey/ApiKeyModal/ApiKeyModal';
import ApiKeyTable from 'ui/apiKey/ApiKeyTable/ApiKeyTable';
import DeleteApiKeyModal from 'ui/apiKey/DeleteApiKeyModal';
import AccountPageHeader from 'ui/shared/AccountPageHeader';
import Page from 'ui/shared/Page/Page';

const DATA_LIMIT = 3;

const ApiKeys: React.FC = () => {
  const apiKeyModalProps = useDisclosure();
  const deleteModalProps = useDisclosure();

  const [ apiKeyModalData, setApiKeyModalData ] = useState<TApiKeyItem>();
  const [ deleteModalData, setDeleteModalData ] = useState<string>();

  useQuery([ 'api-keys' ], async() => {
    const response = await fetch('/api/account/api-keys');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });

  const onEditClick = useCallback((data: TApiKeyItem) => {
    setApiKeyModalData(data);
    apiKeyModalProps.onOpen();
  }, [ apiKeyModalProps ]);

  const onApiKeyModalClose = useCallback(() => {
    setApiKeyModalData(undefined);
    apiKeyModalProps.onClose();
  }, [ apiKeyModalProps ]);

  const onDeleteClick = useCallback((data: TApiKeyItem) => {
    setDeleteModalData(data.name);
    deleteModalProps.onOpen();
  }, [ deleteModalProps ]);

  const onDeleteModalClose = useCallback(() => {
    setDeleteModalData(undefined);
    deleteModalProps.onClose();
  }, [ deleteModalProps ]);

  const canAdd = apiKey.length < DATA_LIMIT;

  return (
    <Page>
      <Box h="100%">
        <AccountPageHeader text="API keys"/>
        <Text marginBottom={ 12 }>
          Create API keys to use for your RPC and EthRPC API requests. For more information, see { space }
          <Link href="#">“How to use a Blockscout API key”</Link>.
        </Text>
        { Boolean(apiKey.length) && (
          <ApiKeyTable
            data={ apiKey }
            onDeleteClick={ onDeleteClick }
            onEditClick={ onEditClick }
            limit={ DATA_LIMIT }
          />
        ) }
        <HStack marginTop={ 8 } spacing={ 5 }>
          <Button
            variant="primary"
            size="lg"
            onClick={ apiKeyModalProps.onOpen }
            disabled={ !canAdd }
          >
            Add API key
          </Button>
          { !canAdd && (
            <Text fontSize="sm" variant="secondary">
              { `You have added the maximum number of API keys (${ DATA_LIMIT }). Contact us to request additional keys.` }
            </Text>
          ) }
        </HStack>
      </Box>
      <ApiKeyModal { ...apiKeyModalProps } onClose={ onApiKeyModalClose } data={ apiKeyModalData }/>
      <DeleteApiKeyModal { ...deleteModalProps } onClose={ onDeleteModalClose } name={ deleteModalData }/>
    </Page>
  );
};

export default ApiKeys;
