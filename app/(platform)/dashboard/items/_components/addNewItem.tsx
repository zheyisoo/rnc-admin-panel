"use client"

import {useState } from 'react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import addNewItem from '@/action/addNewItem';
import { Item } from '@prisma/client';
import { Category } from '@prisma/client';
import { SingleImageDropzone } from '@/components/singleImageDropZone';
import { useEdgeStore } from '@/lib/edgestore';

export const AddNewItem = () => {

    //form state
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState(''); 
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState<string>('');
    const [category, setCategory] = useState<Category>(Category.FOOD);

    //image upload state
    const [file, setFile] = useState<File>();
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const { edgestore } = useEdgeStore();

    const handleSaveChanges = () => {
        const newItem: Item = {
            id: 0,
            name: name,
            price: price,
            quantity: quantity,
            category: category,
            imageUrls: image,
            updatedAt: new Date(),
            createdAt: new Date(),
        };
        addNewItem(newItem)
        setIsOpen(false);
    }

    const handleUpload = async () => {
        if (file) {
          try {
            setUploading(true);
    
            const res = await edgestore.publicFiles.upload({
              file,
              onProgressChange: (progress) => {
                setProgress(progress);
              },
            });
            setImage(res.url);
            console.log(res);
          } catch (error) {
            console.error('Error uploading file:', error);
          } finally {
            setUploading(false);
            setProgress(0);
          }
        }
      };

    return (
        <div>
            <Button onClick ={()=>setIsOpen(true)} variant="outline">Add New Item</Button>
            <Dialog onOpenChange={()=>setIsOpen(false)} open = {isOpen}>
            <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Create New Item</DialogTitle>
                <DialogDescription>
                Create new item here. Click save when you're done.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                    Name
                </Label>
                <Input id="name" 
                onChange={(e) => setName(e.target.value)} 
                value={name} placeholder={'item name'}
                className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                    Quantity
                </Label>
                <Input type="number" id="quantity" 
                onChange={(e) => setQuantity(parseInt(e.target.value))} 
                value={quantity} 
                placeholder={'0'} 
                className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                    Price
                </Label>
                <Input type="number" id="price"
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                placeholder={'0'}
                className="col-span-3"
                pattern="[0-9]*"            
                value={price}/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                    Category
                </Label>
                <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={Category.FOOD} />
                </SelectTrigger>
                <SelectContent>
                    {Object.values(Category).map((category) => (
                    <SelectItem value={category} key={category} onClick={() => setCategory(category as Category)}>
                        {category}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
                </div>
            </div>
            <div className='flex items-center justify-center'>
                <SingleImageDropzone
                    width={50}
                    height={50}
                    value={file}
                    onChange={(file) => {
                    setFile(file);
                    }}
                />
            </div>
            <div className='flex items-center justify-center'>
            <Button
                onClick={handleUpload}
                disabled={uploading}
            >
                {uploading ? `Uploading... ${progress}%` : 'Upload'}
            </Button>
            </div>
            <div className='flex items-center justify-center'>
                <Button type="submit" onClick={() => handleSaveChanges()}>Save changes</Button>
            </div>
            {/* <DialogFooter>
            </DialogFooter> */}
            </DialogContent>
        </Dialog>
        </div>
    )
}
