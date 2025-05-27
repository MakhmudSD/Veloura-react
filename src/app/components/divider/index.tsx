import React from 'react';
import styled from 'styled-components';

export interface IDividerProps {
  width?: string;
  height?: string;
  bg?: string;
  borderRadius?: string;
  margin?: string;
}

const DividerComponent = styled.span<IDividerProps>`
  display: block;
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '2px'};
  background-color: ${({ bg }) => bg || '#ccc'};
  border-radius: ${({ borderRadius }) => borderRadius || '1px'};
  margin: ${({ margin }) => margin || '16px 0'};
`;

function Divider(props: IDividerProps) {
  return <DividerComponent {...props} />;
}

export default Divider;

