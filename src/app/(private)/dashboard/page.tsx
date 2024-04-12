"use client"
import { Button } from "@/components/ui/button"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { domain } from "@/lib/utils"
import axios, { AxiosError } from "axios"
import { Link2Icon } from "lucide-react"
import { useState } from "react"

export default function Component() { 
    const [data, setData] = useState({
        link: "",
        shortLink: ""
    })
    
    const [shortLink, setShortLink] = useState(`${domain}/links/...`)
    const [loading, setLoading] = useState(false)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        try {
          const response = await axios.post('/api/link', {
            link: data.link,
            shortLink: data.shortLink
          })
          setShortLink(domain + '/links/' + response.data.shortLink)
        } catch (error) {
          const axiosError = error as AxiosError;
          alert(axiosError?.response?.data || "Something Went Wrong")
          console.log(error)
        } finally {
          setLoading(false)
        }
    }
    const handleCopy = () => {
        navigator.clipboard.writeText(shortLink)
            .then(() => {
                console.log('Link copied to clipboard');
            })
            .catch((error) => {
                console.error('Failed to copy:', error);
            });
    }

    return (
        <form className="max-w-md mx-auto flex-col min-h-screen flex items-center justify-center" onSubmit={handleSubmit}>
            <CardHeader className="flex items-center justify-center">
                <Link2Icon />
                <CardTitle>Link Shortener</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
                <Input className="w-full" value={data.link} onChange={(e) => setData({ ...data, link: e.target.value })} placeholder="Enter your link" />
                <Input className="w-full" value={data.shortLink} onChange={(e) => setData({ ...data, shortLink: e.target.value })} placeholder="Enter custom text(Optional)" />
                <Button className="w-full" disabled={loading} type="submit">Generate</Button>
                <div className="flex items-center justify-center space-x-2">
                    <Input className="w-full" readOnly value={shortLink} />
                    <Button onClick={handleCopy} disabled={loading}>Copy</Button>
                </div>
            </CardContent>
        </form>
    )
}