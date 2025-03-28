"use client"

import TransitionDiv from '@/components/animations/transitiondiv';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from '@clerk/nextjs/server';
import axios from 'axios';
import { Calendar, Mail, Phone } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

export default function UserProfile({ params }: { 
  params: Promise<{ userId: string }>
}) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCreatedBy = async () => {
      try {
        const res = await axios.get('/api/user', {
          params: {
            userId: (await params).userId
          }
        });

        if (res.status != 200) {
          throw Error(res.data.message);
        }

        setUser(res.data);
      } catch (e: any) {
        console.error(e);
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    }

    getCreatedBy();
  }, [params]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p>User not found</p>
        </CardContent>
      </Card>
    );
  }

  // Calculate age from dateOfBirth
  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const age = user.dateOfBirth ? calculateAge(user.dateOfBirth) : null;

  return (
    <TransitionDiv>
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="border-b">
          <div className="flex items-center space-x-4 mb-8">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.imageUrl} />
              <AvatarFallback>
                {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">
                {user.firstName} {user.lastName}
                {user.preferredName && (
                  <span className="text-lg font-normal text-muted-foreground ml-2">
                    ({user.preferredName})
                  </span>
                )}
              </CardTitle>
              <div className="flex items-center mt-2 space-x-2">
                <Badge variant="outline" className="capitalize">
                  {user.gender?.toLowerCase() || 'Not specified'}
                </Badge>
                {age && (
                  <Badge variant="outline">
                    {age} years
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="grid gap-4 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">
                  {user.primaryEmailAddress?.emailAddress || 'Not provided'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <a 
                  href={`tel:${user.phoneNumber}`} 
                  className="font-medium hover:underline"
                >
                  {user.phoneNumber || 'Not provided'}
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Date of Birth</p>
                <p className="font-medium">
                  {user.dateOfBirth ? 
                    new Date(user.dateOfBirth).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'Not provided'
                  }
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-muted-foreground"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <div>
                <p className="text-sm text-muted-foreground">User ID</p>
                <p className="font-mono text-sm font-medium">
                  {user.userId}
                </p>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">Account Created</p>
            <p className="font-medium">
              {new Date(user.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </CardContent>
      </Card>
    </TransitionDiv>
  );
}