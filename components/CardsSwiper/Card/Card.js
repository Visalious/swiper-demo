import React from 'react';
import { Card, Image } from 'antd';
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  UserOutlined,
  UpCircleFilled
} from '@ant-design/icons';

const EventCard = ({ image, heading, text, swipeDirection }) => {
  const rotateIcon = swipeDirection === 'right' ? 'rotate(180deg)' : swipeDirection === 'left' ? 'rotate(-180deg)' : '';
  const transitionStyle = swipeDirection ? `transform 0.5s ease-in-out` : '';

  return (
    <div className="w-full h-full bg-transparent text-white">
      <Card

        className="rounded-lg !p-0 overflow-hidden !border-none relative h-full bg-transparent"
      >
        <div className='w-full h-[18rem] overflow-hidden'>
          <Image
            alt="event"
            src={image}
            preview={false}
            style={{
              height: '100%',
              objectFit: 'cover',
            }}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="absolute top-3.5 right-2.5 bg-gray-800  text-white px-2.5 py-1 rounded-xl text-xs z-10">
          Pet Love
        </span>
        <div className="border-solid w-full">
          <div className="w-full text-left text-white p-2.5 font-semibold text-md tracking-wide">
            {heading}
          </div>
          <div className="flex justify-between p-2.5 text-white items-center w-full text-sm ">
            <span className="font-bold">₹ 0.00</span>
            <span>
              <ClockCircleOutlined /> 23:59 - 0:0
            </span>
            <span>
              <UserOutlined /> 24 guests
            </span>
          </div>
          <div className="text-gray-500 w-full text-left p-2.5">
            <EnvironmentOutlined /> Indore, Madhya Pradesh, IN
          </div>
          <div className="font-bold text-orange-500 w-full text-left pl-2.5">
            Starts in 7 hrs
          </div>
          <div className="w-full flex justify-end items-end pr-2" style={{ transition: transitionStyle }}>
            <UpCircleFilled className='text-xl text-gray-400' style={{ transform: rotateIcon }} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EventCard;
