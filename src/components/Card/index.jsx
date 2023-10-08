import React from 'react';
import { styled } from '@mui/system';
import { Box } from '@mui/material';

const CardWrapper = styled(Box)({
    height: '100%',
    border: '1px solid #d0d7de',
    borderRadius: "20px",
});

const TitleWrapper = styled('div')({
    width: '100%'
});

const Title = styled('h6')({
    textAlign: 'center',
});


const CustomCard = ({ title, children }) => {

    return (
        <CardWrapper sx={{ display: 'flex' }}>
            <TitleWrapper>
                <Title>{title}</Title>
            </TitleWrapper>
            <div>
                {children}
            </div>
        </CardWrapper>
    );
}

export default CustomCard;