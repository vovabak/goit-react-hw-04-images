import { ThreeDots } from 'react-loader-spinner';
import PropTypes from "prop-types";

export const Loader = ({status}) => {
   return <span>
            <ThreeDots
               color="#3f51b5"
               wrapperStyle={{ justifyContent: 'center' }}
               visible={status === 'pending'}
            />
         </span >
}

Loader.propTypes = {
   status: PropTypes.string.isRequired,
}