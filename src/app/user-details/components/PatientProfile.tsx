import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { User } from "../../../types";

import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../../components/ui/collapsible";
import { Separator } from "../../../components/ui/separator";

import {
  ArrowLeft,
  Copy,
  Mail,
  Phone,
  Clock,
  FileText,
  Heart,
  CreditCard,
  Calendar,
  DollarSign,
  Ruler,
  Scale,
  Droplet,
  User as IconUser,
} from "lucide-react";

const URL_API = "https://dummyjson.com/users";

export default function PatientProfile() {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch user data on mount
  useEffect(() => {
    fetch(`${URL_API}/${userId}`)
      .then(async (res) => await res.json())
      .then((res) => {
        setUser(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [userId]);

  if (isLoading) return <p>Loading...</p>;
  if (!user) return <p>Patient not found...</p>;

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString();

  return (
    <div className="container mx-auto">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          {/* Patient Profile Card */}
          <div className="flex-1">
            <Card className="flex flex-col h-full">
              <CardHeader>
                <CardTitle className="text-base">Patient Profile</CardTitle>
                <CardDescription>Basic patient details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user.image || "https://via.placeholder.com/150"} />
                    <AvatarFallback>
                      {user.firstName[0]}{user.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <h3 className="font-semibold text-base">
                      {user.firstName} {user.lastName}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      {user.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      {user.phone}
                    </div>
                  </div>
                </div>
                <Collapsible className="mt-6">
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-full justify-between">
                      View more details
                      <ArrowLeft className="h-4 w-4 rotate-90" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4 space-y-4">
                    <div className="grid gap-2">
                      <div className="text-sm font-medium">Date of Birth</div>
                      <div className="text-sm text-muted-foreground">{formatDate(user.birthDate)}</div>
                    </div>
                    <div className="grid gap-2">
                      <div className="text-sm font-medium">Address</div>
                      <div className="text-sm text-muted-foreground">
                        {user.address.address}, {user.address.city}, {user.address.state} {user.address.postalCode}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          </div>
          {/* Bank Details Card */}
          <div className="flex-1">
            <Card className="flex flex-col h-full">
              <CardHeader className="flex gap-2">
                <div>
                  <CardTitle className="text-base">Bank Details</CardTitle>
                  <CardDescription>Patient&apos;s bank information</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Copy className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Card IBAN</span>
                  </div>
                  <div className="text-lg">{user.bank.iban}</div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Card Type</span>
                  </div>
                  <div className="text-lg">{user.bank.cardType}</div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Card Expiry</span>
                  </div>
                  <div className="text-lg">{user.bank.cardExpire}</div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Card Currency</span>
                  </div>
                  <div className="text-lg">{user.bank.currency}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {/* Timeline Card */}
          <div className="flex-1">
            <Card className="flex flex-col h-full">
              <CardHeader>
                <CardTitle className="text-base">Timeline</CardTitle>
                <CardDescription>History of sensor events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-500 bg-blue-50">
                      <Heart className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="grid gap-1">
                      <div className="font-medium">Vital Signs Recorded</div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-orange-500 bg-orange-50">
                      <Clock className="h-4 w-4 text-orange-500" />
                    </div>
                    <div className="grid gap-1">
                      <div className="font-medium">Sensor Calibrated</div>
                    </div>
                  </div>
                  <div className="flex gap-4 opacity-40">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-green-500 bg-green-50">
                      <FileText className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="grid gap-1">
                      <div className="font-medium">Data Synced</div>
                      <div className="text-sm text-muted-foreground">Synced recently</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Medical Details Card */}
          <div className="flex-1">
            <Card className="flex flex-col h-full">
              <CardHeader className="flex gap-2">
                <div>
                  <CardTitle className="text-base">Medical Details</CardTitle>
                  <CardDescription>Additional patient information</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconUser className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Age</span>
                  </div>
                  <div className="text-lg">{user.age}</div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Height</span>
                  </div>
                  <div className="text-lg">{user.height} cm</div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Scale className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Weight</span>
                  </div>
                  <div className="text-lg">{user.weight} kg</div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Droplet className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Blood Group</span>
                  </div>
                  <div className="text-lg">{user.bloodGroup}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
