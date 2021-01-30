import styled from 'styled-components'

export const ToolbarContainer = styled.header`
    height: 56px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #703B09;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    z-index: 90;

    nav {
        height: 100%;
    }

    .logo-wrapper {
        height: 80%;
    }

    @media (max-width: 499px) {
        .desktop-only {
            display: none
        }
    }
`