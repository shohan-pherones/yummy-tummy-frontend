"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";

const formSchema = z.object({
  searchQuery: z.string({ required_error: "City name is required" }),
});

export type SearchForm = z.infer<typeof formSchema>;

interface Props {
  onSubmit: (formData: SearchForm) => void;
  placeholder: string;
  onReset?: () => void;
}

const SearchBar = ({ onSubmit, placeholder, onReset }: Props) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery: "",
    },
  });

  const handleReset = () => {
    form.reset({
      searchQuery: "",
    });

    if (onReset) {
      onReset();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center flex-1 gap-3 justify-between border-2 rounded-full p-3 mx-5"
      >
        <Search
          size={30}
          strokeWidth={2.5}
          className="text-pink-500 ml-1 hidden md:block"
        />
        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  placeholder={placeholder}
                  required
                  className="border-none shadow-none md:text-xl focus-visible:ring-0"
                />
              </FormControl>
            </FormItem>
          )}
        />
        {form.formState.isDirty && (
          <Button
            onClick={handleReset}
            type="button"
            variant="outline"
            className="rounded-full"
          >
            Clear
          </Button>
        )}
        <Button type="submit" className="rounded-full bg-pink-500">
          Search
        </Button>
      </form>
    </Form>
  );
};

export default SearchBar;
