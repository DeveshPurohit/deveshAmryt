"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useToast } from "@/components/ui/use-toast"

import {
  GetCountries,
  GetState,
  GetCity,
  //@ts-ignore
} from "react-country-state-city";

import "react-country-state-city/dist/react-country-state-city.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  firstname: z
    .string()
    .min(2, { message: "Firstname must be at least 2 characters." }),
  lastname: z
    .string()
    .min(2, { message: "Lastname must be at least 2 characters." }),
  image: z
    .instanceof(File, { message: "Please upload a file." })
    .refine((f) => f.size < 3000_000, "Max 3mb upload size."),
  age: z.string({ message: "Age must be a positive integer" }),
  gender: z.string({ message: "Gender is required" }),
  hobbies: z.string().optional(),
  country: z.string({ message: "Country is required" }),
  state: z.string({ message: "State is required" }),
  city: z.string({ message: "City is required" }),
});

export function ProfileForm() {
  const router = useRouter()

  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);

  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const { toast } = useToast()

  useEffect(() => {
    GetCountries().then((res: any) => {
      setCountriesList(res);
    });
  }, []);

  useEffect(() => {
    if (countryid) {
      GetState(countryid).then((res: any) => {
        setStateList(res);
      });
    }
  }, [countryid]);

  useEffect(() => {
    if (stateid) {
      GetCity(countryid, stateid).then((res: any) => {
        setCityList(res);
      });
    }
  }, [stateid]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: undefined,
      lastname: undefined,
      age: undefined,
      gender: undefined,
      hobbies: undefined,
      country: undefined,
      state: undefined,
      city: undefined,
    },
  });
 
  function onSubmit(values: z.infer<typeof formSchema>) {
    localStorage.setItem('profileData', JSON.stringify(values));
    toast({
      title: "Profile Created Successfully!",
    })
    form.reset();
    router.push('/dashboard');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Firstname</FormLabel>
              <FormControl>
                <Input placeholder="firstname" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lastname</FormLabel>
              <FormControl>
                <Input placeholder="lastname" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const files = e.target.files;
                    const file = files && files[0];
                    field.onChange(file ? file : null);
                  }}
                  ref={field.ref}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input placeholder="age" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hobbies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hobbies</FormLabel>
              <FormControl>
                <Input placeholder="hobbies" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    setCountryid(
                      //@ts-ignore
                      countriesList.find((c) => c.name === value).id
                    );
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countriesList.map(
                      (country: { id: number; name: string }) => (
                        <SelectItem key={country.id} value={country.name}>
                          {country.name}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    //@ts-ignore
                    setStateid(stateList.find((c) => c.name === value).id);
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {stateList.map((state: { id: number; name: string }) => (
                      <SelectItem key={state.id} value={state.name}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cityList.map((city: { id: number; name: string }) => (
                      <SelectItem key={city.id} value={city.name}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
