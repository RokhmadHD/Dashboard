import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import Workspace from '@/components/workspace/Workspace';
import React from 'react'

function BlogCreatePage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Create new post" />
      <div className="min-h-max rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <Workspace />
      </div>
    </div>
  )
} 

export default BlogCreatePage
