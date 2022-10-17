import styled from "styled-components";

const HeaderWrapper = styled.div`
  .Tool-bar{
    width: 80%;
    margin: auto;
    justify-content: space-between;
  }

  .Btn{
    :focus{
    outline: none;
    }

    :hover{
      background-color: #45c3d2;
    }
  }


  .Btn-help{
    flex-direction: column;

    :focus{
      outline: none;
    }

    :hover{
      background-color: #45c3d2;
    }
  }
`

export {HeaderWrapper}