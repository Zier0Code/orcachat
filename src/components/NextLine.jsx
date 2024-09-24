import React from 'react'

const NextLine = ({ message }) => {
    return (
        <div>
            {message.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                    {line}
                    <br />
                </React.Fragment>
            ))}
        </div>
    );
};

export default NextLine