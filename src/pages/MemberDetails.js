import React from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import UpdateMemberDetails from '../components/UpdateMemberDetails';
import ViewMemberDetails from '../components/ViewMemberDetails';

const MemberDetails = () => {
  const { member_id } = useParams();

  const user = Cookies.get('user');

  return (
    <div>
      <div>
        <>
          {user == 'admin' ? (
            <UpdateMemberDetails member_id={member_id} />
          ) : (
            <ViewMemberDetails member_id={member_id} />
          )}
        </>
      </div>
    </div>
  );
};

export default MemberDetails;
