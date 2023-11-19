import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Text, Card, CardBody } from '@chakra-ui/react';

const ViewMemberDetails = ({ member_id }) => {
  const [member, setMember] = useState(null);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/member/one/${member_id}`
        );
        setMember(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMember();
  }, [member_id]);

  if (!member) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <Card>
          <CardBody>
            <div>
              <Text as="span">Member name: </Text>
              <Text as="span" className="member-info">
                {member.head_member}
              </Text>
            </div>
            <div>
              <Text as="span">Email: </Text>
              <Text as="span" className="member-info">
                {member.email}
              </Text>
            </div>
            <div>
              <Text as="span">Paid: </Text>
              <Text as="span" className={member.paid ? '' : 'red-bg'}>
                {member.paid ? 'yes' : 'no'}
              </Text>
            </div>
            <div>
              <Text as="span">Registered: </Text>
              <Text as="span" className={member.registered ? '' : 'red-bg'}>
                {member.registered ? 'yes' : 'no'}
              </Text>
            </div>
            <div>
              <Text as="span">Family Members:</Text>
              {member.family_members.map(family_member => (
                <li key={family_member._id}>
                  <span className="family-member-info">
                    {family_member.member}
                  </span>
                </li>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ViewMemberDetails;
