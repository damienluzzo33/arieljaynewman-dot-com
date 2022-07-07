import React from 'react';
import { useParams } from "react-router-dom";

export default function ArtPiecePage(props) {

    const { artPiece } = useParams()

    // const { artPiece } = props;



    return (
        <div>
            Hello
        </div>
    )
}