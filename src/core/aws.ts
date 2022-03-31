import AWS from 'aws-sdk';
import config from '../config';

AWS.config.update({region: config.region});

export default AWS;