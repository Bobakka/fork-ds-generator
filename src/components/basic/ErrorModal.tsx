import React from 'react';
import { Button, Modal } from 'antd';
interface Props {
    error: Error,
    setError: (value: Error | null) => void
}
const ErrorModal: React.FC<Props> = ({ error, setError }) => {
    const AnyModal = Modal as any;

    return (
        <>
            <AnyModal footer={null} visible={true} onCancel={() => setError(null)}>
                {error.message}
            </AnyModal>
        </>
    )

};
export default ErrorModal;