import styled from "styled-components";

export const AppContainer = styled.div`
  min-height: 100vh;
  background: #f7f7fb;
`;

export const PageContainer = styled.div`
  margin: 0 auto;
  padding: 16px;

  @media (min-width: 768px) {
    max-width: 720px;
    padding: 24px;
  }

  @media (min-width: 992px) {
    max-width: 960px;
  }

  @media (min-width: 1200px) {
    max-width: 1140px;
  }
`;

export const Section = styled.section`
  margin-bottom: 24px;
`;

export const GridWrapper = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(1, minmax(0, 1fr));

  @media (min-width: 576px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (min-width: 992px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

export const SplitLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

export const SplitMain = styled.div`
  flex: 1;
`;

export const SplitSide = styled.aside`
  flex: 0 0 300px;
  width: 100%;

  @media (min-width: 768px) {
    position: sticky;
    top: 96px;
  }
`;
