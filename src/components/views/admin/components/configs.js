import React from 'react'
import styled from 'styled-components'
import ConfigList from './configs/configList'
import ConfigItem from './configs/configItem'

const DashboardConfig = styled.div`
  padding: 15px 10px;
  flex: 1;
  max-width: 75%;
  display: flex;
  flex-flow: row wrap;
`;

const Configs = () => (
  <DashboardConfig>
    <ConfigList>
      <ConfigItem>Anúncios</ConfigItem>
      <ConfigItem>Vendas</ConfigItem>
      <ConfigItem>Encomendas</ConfigItem>
      <ConfigItem>Mais vendido</ConfigItem>
      <ConfigItem>Total no mês</ConfigItem>
      <ConfigItem>Total no dia</ConfigItem>
    </ConfigList>
  </DashboardConfig>
)

export default Configs