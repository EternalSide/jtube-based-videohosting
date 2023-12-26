"use client";
import {Button} from "@/components/ui/button";
import * as z from "zod";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {useModal} from "@/hooks/useModal";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {useEffect} from "react";
import {userEditSchema} from "@/lib/validation";
import {updateUser} from "@/lib/actions/user.action";
import {usePathname} from "next/navigation";

function EditProfileModal() {
	const {isOpen, setIsOpen, type, data} = useModal();
	const open = type === "edit" && isOpen;
	const path = usePathname();

	useEffect(() => {
		form.setValue("name", data.name);
		if (data.about) {
			form.setValue("about", data.about);
		}
		if (data.link) {
			form.setValue("link", data.link);
		}
		if (data.link === "") {
			form.setValue("link", "Контактные данные не установлены.");
		}
	}, [data]);

	useEffect(() => {
		form.clearErrors();
	}, [isOpen]);

	const form = useForm<z.infer<typeof userEditSchema>>({
		resolver: zodResolver(userEditSchema),
		defaultValues: {
			name: "",
			about: "",
			link: "",
		},
		mode: "onSubmit",
	});

	async function onSubmit(values: z.infer<typeof userEditSchema>) {
		if (
			data.name === values.name &&
			data.link === values.link &&
			data.about === values.about
		) {
			return setIsOpen(false, "edit");
		}

		try {
			setIsOpen(false, "edit");
			await updateUser({
				clerkId: data.clerkId,
				updatedData: {
					...values,
					link: values?.link ? values.link : "",
				},
				path,
			});
		} catch (e) {
			console.log(e);
		}
	}
	const {isLoading, isValid} = form.formState;

	return (
		<Dialog
			open={open}
			onOpenChange={() => setIsOpen(!isOpen, "edit")}
		>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Редактировать профиль</DialogTitle>
					<DialogDescription>
						Внесите изменения в свой профиль здесь. Нажмите «Сохранить», когда
						закончите.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-4'
					>
						<FormField
							control={form.control}
							name='name'
							render={({field}) => (
								<FormItem>
									<FormLabel>Имя</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='about'
							render={({field}) => (
								<FormItem>
									<FormLabel>О себе</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='link'
							render={({field}) => (
								<FormItem>
									<FormLabel>Контактные данные</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button
								disabled={isLoading || !isValid}
								className='bg-indigo-600 text-white disabled:opacity-80'
								type='submit'
							>
								Сохранить изменения
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

export default EditProfileModal;
