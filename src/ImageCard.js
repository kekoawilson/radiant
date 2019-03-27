import React from 'react';
import { Card, Image } from 'semantic-ui-react';

const ImageCard = (props) => (
    <Card>
        <Card.Content>
            <Card.Header textAlign="center" onClick={props.onClick}>{props.title}</Card.Header>
        </Card.Content>
        <Image centered size="small" src={props.url} onClick={props.onClick} />
    </Card>
);

export default ImageCard;
