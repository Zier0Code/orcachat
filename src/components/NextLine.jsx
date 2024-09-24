import React from 'react'

const NextLine = ({ message }) => {
    return (
        <div>
            <p className='ml-2 text-sm sm:text-base'>
                {message.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                        {line}
                        <br />
                    </React.Fragment>
                ))}
            </p>
        </div>
    );
};

export default NextLine